import { Controller, Get, Req } from '@nestjs/common';
import { AdminService } from './admin.service';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTY0NDcxMjgsImV4cCI6MTc1NjQ1NzkyOH0.0w5jFG2aruEmxLn255fhogJNGLRg_VV9VjJ86Pr-aFY
@Controller('/api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdmin(@Req() req: any) {
    return this.adminService.getAdmin(req);
  }
}
