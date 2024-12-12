import { Lesson } from "./lesson";

export class StudentInfo {
  studentId: string;
  name: string;
  address: string;
  lessons: Lesson[];
  constructor(
    studentId: string,
    name: string,
    address: string,
    lessons: Lesson[]
  ) {
    this.studentId = studentId;
    this.name = name;
    this.address = address;
    this.lessons = lessons;
  }
}
