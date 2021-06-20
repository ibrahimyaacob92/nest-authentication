import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAModule } from 'src/user_a/user_a.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
// import { LocalAuthGuard } from './local-auth.guard';

@Module({
  imports: [UserAModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
