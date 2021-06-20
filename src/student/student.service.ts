import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import { CreateStudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  private readonly students = students;
  getStudents() {
    return students;
  }

  getStudentById(studentId: string): Student {
    return this.students.find((student) => {
      return student.id === studentId;
    });
  }

  createStudent(payload: CreateStudentDto): Student {
    const newStudent = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);
    return newStudent;
  }
}
