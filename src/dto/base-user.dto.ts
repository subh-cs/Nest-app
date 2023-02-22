//dto/base-user.dto.ts
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;
}
