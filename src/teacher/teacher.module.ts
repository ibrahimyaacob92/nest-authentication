import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import {
  TeacherController,
  TeacherStudentController,
} from './teacher.controller';

@Module({
  controllers: [TeacherController, TeacherStudentController],
  providers: [TeacherService],
})
export class TeacherModule {}
