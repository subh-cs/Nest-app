import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { AppService } from './app.service';
import { UserDtoStub } from '../test/stubs/user.dto.stub';

describe('AppService', () => {
  let appService: AppService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe('findAll', () => {
    it('should return an empty array when there are no users', async () => {
      const result = await appService.findAll();
      expect(result).toEqual([]);
    });

    it('should return an array of users when there are users in the database', async () => {
      const user1 = new userModel({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      const user2 = new userModel({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password',
      });
      await user1.save();
      await user2.save();

      const result = await appService.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].name).toEqual(user1.name);
      expect(result[1].name).toEqual(user2.name);
    });
  });

  describe('findOne', () => {
    it('should return a user with the specified id', async () => {
      const user = new userModel({
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      });
      await user.save();

      const result = await appService.findOne(user.id);
      expect(result).toBeDefined();
      expect(result.name).toEqual(user.name);
      expect(result.email).toEqual(user.email);
      expect(result.password).toEqual(user.password);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
      };
      const result = await appService.create(createUserDto);
      expect(result).toBeDefined();
      expect(result.name).toEqual(createUserDto.name);
      expect(result.email).toEqual(createUserDto.email);
      expect(result.password).toEqual(createUserDto.password);
    });
  });

  // describe('updateUser', () => {
  //   it('should update user', async () => {
  //     const createdUser = await userModel.create(UserDtoStub());
  //     const updateUserDto = {
  //       name: 'updated name',
  //       email: 'updated email',
  //       password: 'updated password',
  //     };
  //     const updatedUser = await appService.update(
  //       createdUser.id,
  //       updateUserDto,
  //     );
  //     expect(updatedUser.name).toEqual(updateUserDto.name);
  //   });

  //   it('should throw error when user is not found', async () => {
  //     const updateUserDto = {
  //       name: 'updated name',
  //       email: 'updated email',
  //       password: 'updated password',
  //     };
  //     const nonExistingUserId = 'nonExistingUserId';
  //     await expect(
  //       appService.update(nonExistingUserId, updateUserDto),
  //     ).rejects.toThrow(UserDontExists);
  //   });
  // });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      const createdUser = await userModel.create(UserDtoStub());
      const deletedUser = await appService.delete(createdUser.id);
      expect(deletedUser.email).toEqual(createdUser.email);
    });

    // it('should throw error when user is not found', async () => {
    //   const nonExistingUserId = 'nonExistingUserId';
    //   await expect(appService.delete(nonExistingUserId)).rejects.toThrow(
    //     UserDontExists,
    //   );
    // });
  });
});
