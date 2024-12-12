import { AvailableSchedule } from "./availableSchedule";
import { StudentInfo } from "./studentInfo";

export class TeacherInfo {
  name: string;
  students: StudentInfo[];
  availableSchedule: AvailableSchedule;
  constructor(
    name: string,
    students: StudentInfo[],
    availableSchedule: AvailableSchedule
  ) {
    this.name = name;
    this.students = students;
    this.availableSchedule = availableSchedule;
  }
}
