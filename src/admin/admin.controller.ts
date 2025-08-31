import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'guard/roles.guard';
import { Roles } from 'decorator/roles.decorator';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTY0NDcxMjgsImV4cCI6MTc1NjQ1NzkyOH0.0w5jFG2aruEmxLn255fhogJNGLRg_VV9VjJ86Pr-aFY
@Controller('/api/admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Decorator diletakkan pada setiap method apabila setiap method memiliki role yang berbeda beda
  // @Get() tanpa decorator jadi GET bisa diakses siapapu
  // @Post() @Roles('admin') dengan decorator agar POST hanya boleh diakses oleh admin
  @Get()
  @Roles('admin')
  getAdmin(@Req() req: any) {
    return this.adminService.getAdmin(req);
  }
}
