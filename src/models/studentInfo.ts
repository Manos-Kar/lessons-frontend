import { AvailableSchedule } from "./enums";
import { Lesson } from "./lesson";

export class StudentInfo {
  studentId: string;
  name: string;
  address: string;
  lessons: Lesson[];
  available_schedule: AvailableSchedule;
  constructor(
    studentId: string,
    name: string,
    address: string,
    lessons: Lesson[],
    available_schedule: AvailableSchedule
  ) {
    this.studentId = studentId;
    this.name = name;
    this.address = address;
    this.lessons = lessons;
    this.available_schedule = available_schedule;
  }

  static emptyStudentInfo() {
    return new StudentInfo("new_student", "", "", [], []);
  }
}
