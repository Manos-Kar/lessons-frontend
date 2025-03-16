import { generateUUID } from "../services/commonFunctions";
import { AvailableSchedule, defaultAvailableSchedule } from "./enums";
import { Lesson } from "./lesson";

export class StudentInfo {
  studentId: string;
  name: string;
  address: string;
  lessons: Lesson[];
  availableSchedule: AvailableSchedule;
  constructor(
    studentId: string,
    name: string,
    address: string,
    lessons: Lesson[],
    availableSchedule: AvailableSchedule
  ) {
    this.studentId = studentId;
    this.name = name;
    this.address = address;
    this.lessons = lessons;
    this.availableSchedule = availableSchedule;
  }

  static emptyStudentInfo() {
    return new StudentInfo(
      generateUUID(),
      "",
      "",
      [],
      defaultAvailableSchedule()
    );
  }
}
