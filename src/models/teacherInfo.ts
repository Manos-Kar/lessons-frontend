import { AvailableSchedule } from "./enums";
import { StudentInfo } from "./studentInfo";

export class TeacherInfo {
  name: string;
  callName: string;
  students: StudentInfo[];
  availableSchedule: AvailableSchedule;
  constructor(
    name: string,
    callName: string,
    students: StudentInfo[],
    availableSchedule: AvailableSchedule
  ) {
    this.name = name;
    this.callName = callName;
    this.students = students;
    this.availableSchedule = availableSchedule;
  }

  static FromJson(json: any): TeacherInfo {
    return new TeacherInfo(
      json.name,
      json.call_name,
      [...json.students],
      json.available_schedule
    );
  }
}
