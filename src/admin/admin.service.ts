import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdmin(req: any) {
    return {
      data: 'welcome admin',
      meta: req.user,
    };
  }
}
