/* This app is for tracking the changes */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { App2Controller } from './App2.controller';

@Module({
  imports: [AuthModule],
  controllers: [App2Controller],
  providers: [],
})
export class App2Module {}
