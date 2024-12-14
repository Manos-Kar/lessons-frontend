import { AvailableSchedule } from "./enums";
import { StudentInfo } from "./studentInfo";

export class TeacherInfo {
  name: string;
  students: StudentInfo[];
  available_schedule: AvailableSchedule;
  constructor(
    name: string,
    students: StudentInfo[],
    available_schedule: AvailableSchedule
  ) {
    this.name = name;
    this.students = students;
    this.available_schedule = available_schedule;
  }
}
