import { Body, Controller, Get, Head, Param, Post, Put } from '@nestjs/common';
import { UpdateTeacherDto } from 'src/teacher/dto/update-teacher.dto';
import { CreateStudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get('')
  getStudents(): Student[] {
    return this.studentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(@Param('studentId') studentId: string): Student {
    return this.studentService.getStudentById(studentId);
  }

  @Post()
  createStudent(@Body() body: CreateStudentDto): Student {
    console.log(body);
    return this.studentService.createStudent(body);
  }

  @Put('/:studentId')
  updateStudent(@Param('studentId') studentId, @Body() body: UpdateTeacherDto) {
    return `Update the ${studentId} with the ${body}`;
  }
}
