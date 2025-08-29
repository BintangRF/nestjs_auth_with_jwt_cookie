import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class LeaderService {
  getLeader(req: any) {
    if (req.user.role !== 'leader') {
      throw new ForbiddenException('Access Denied: Leader Only');
    }

    return {
      data: 'Welcome Leader',
      meta: req.user,
    };
  }
}
