import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdmin(req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Access Denied: Admin Only');
    }

    return {
      data: 'welcome admin',
      meta: req.user,
    };
  }
}
