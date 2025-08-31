import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { RolesGuard } from 'guard/roles.guard';
import { Roles } from 'decorator/roles.decorator';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibGVhZGVyIiwicm9sZSI6ImxlYWRlciIsImlhdCI6MTc1NjQ0NzgzNCwiZXhwIjoxNzU2NDU4NjM0fQ.25w6MYz0LfO8TaGdX23bUURCyQfHDWM1_sZssWVKhP8
@Controller('/api/leader')
@UseGuards(RolesGuard)
@Roles('leader') // untuk validasi role yang bisa mengakses api /api/leader
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}

  @Get()
  getLeader(@Req() req: any) {
    return this.leaderService.getLeader(req);
  }
}
