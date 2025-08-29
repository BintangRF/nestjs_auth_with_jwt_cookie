import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.authService.login(body.username, body.password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return {
      result: 'Login Success',
      role: this.authService.verifyToken(token).role,
    };
  }

  @Get('/check-auth')
  checkAuth(@Req() req: any) {
    return this.authService.checkAuth(req);
  }

  // gunakan passthrough agar response dapat terkirim langsung oleh NEST
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
