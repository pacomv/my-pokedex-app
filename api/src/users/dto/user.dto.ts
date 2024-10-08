import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class GetUserDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  username: string;
}
