import { atom } from "recoil";
import { TeacherInfo } from "../models/teacherInfo";
import { defaultAvailableSchedule } from "../models/enums";

export const teacherInfoState = atom<TeacherInfo>({
  key: "teacherInfoState",
  default: {
    name: "",
    students: [],
    available_schedule: defaultAvailableSchedule(),
  },
});
