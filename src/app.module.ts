import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { App2Module } from './App2/App2.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { TeacherModule } from './teacher/teacher.module';
import { UserAModule } from './user_a/user_a.module';

@Module({
  imports: [TeacherModule, UserAModule, App2Module],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
