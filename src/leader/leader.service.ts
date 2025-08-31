import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class LeaderService {
  getLeader(req: any) {
    return {
      data: 'Welcome Leader',
      meta: req.user,
    };
  }
}
