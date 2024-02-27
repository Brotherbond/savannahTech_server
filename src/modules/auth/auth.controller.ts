import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { DoesUserExist } from '@/core/guards/doesUserExist.guard';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: AuthDto) {
    return await this.authService.login(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('logout')
  async logout(@Req() req: Request<AuthDto>) {
    return await this.authService.logout();
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
