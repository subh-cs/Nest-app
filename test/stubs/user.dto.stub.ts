import { BaseUserDto } from "src/dto/base-user.dto";

export const UserDtoStub = (): BaseUserDto => {
  return {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123456',
  };
};
