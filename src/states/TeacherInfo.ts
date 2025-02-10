import { atom } from "recoil";
import { TeacherInfo } from "../models/teacherInfo";

export const teacherInfoState = atom<TeacherInfo>({
  key: "teacherInfoState",
  default: {
    name: "",
    students: [],
    available_schedule: [],
  },
});
