import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginUserDto, CreateUserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(
      registerDto.name,
      registerDto.username,
      registerDto.password,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('renew-token')
  renewToken(@Body() refreshToken: string) {
    return this.authService.renewToken(refreshToken);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
