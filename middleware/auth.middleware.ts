import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: any, res: any, next: () => void) {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Token not Provided');
    }

    try {
      const payload = this.authService.verifyToken(token);
      req.user = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }
  }
}
