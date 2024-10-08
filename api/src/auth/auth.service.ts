import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid user or password');
    }
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return {
      userId: user.id,
      username,
      accessToken,
      refreshToken,
    };
  }

  async register(name: string, username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!!user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.usersService.create({
      name,
      password: pass,
      username,
    });
    return newUser;
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '7d',
    });
  }

  async renewToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
