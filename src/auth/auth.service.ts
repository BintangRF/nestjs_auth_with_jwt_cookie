import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

type UserAuthProps = {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'leader';
};

@Injectable()
export class AuthService {
  private readonly users: UserAuthProps[] = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'leader', password: 'leader123', role: 'leader' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    return this.signToken({ username: user.username, role: user.role });
  }

  signToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  checkAuth(req: any) {
    return req.user;
  }

  logout(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return 'Logged out Success';
  }
}
