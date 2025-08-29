import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AuthMiddleware } from 'middleware/auth.middleware';
import { LeaderService } from './leader/leader.service';
import { LeaderController } from './leader/leader.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    UserController,
    AdminController,
    LeaderController,
  ],
  providers: [AppService, UserService, AdminService, LeaderService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'api/admin', method: RequestMethod.ALL },
        { path: 'api/leader', method: RequestMethod.ALL },
        { path: 'api/auth/check-auth', method: RequestMethod.ALL },
      );
  }
}
