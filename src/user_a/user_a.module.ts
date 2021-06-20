import { Module } from '@nestjs/common';
import { UserAService } from './user_a.service';
import { UserAController } from './user_a.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserAController],
  providers: [UserAService, PrismaService],
  exports: [UserAService],
})
export class UserAModule {}
