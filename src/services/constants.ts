import { DaysOfWeek } from "../models/enums";

const GET_TEACHER_INFO = "lessons/api/get_teacher_info/";
const STUDENT_INFO = "lessons/api/student_info/";
const LESSON = "lessons/api/lesson/";
const SAVE_AVAILABLE_SCHEDULE = "lessons/api/save_available_schedule/";
const LOGIN = "lessons/login/";
const GET_CSRF_TOKEN = "lessons/api/get_csrf_token/";
const CALCULATE_TRAVEL_TIME = "lessons/api/calculate_travel_time/";

export type UrlOption =
  | "GET_TEACHER_INFO"
  | "GET_CSRF_TOKEN"
  | "LOGIN"
  | "STUDENT_INFO"
  | "LESSON"
  | "SAVE_AVAILABLE_SCHEDULE"
  | "CALCULATE_TRAVEL_TIME";

export const getUrl = (option: UrlOption, ids?: string[]) => {
  let resUrl = "";

  switch (option) {
    case "GET_TEACHER_INFO":
      resUrl += GET_TEACHER_INFO;
      break;
    case "GET_CSRF_TOKEN":
      resUrl += GET_CSRF_TOKEN;
      break;
    case "LOGIN":
      resUrl += LOGIN;
      break;
    case "STUDENT_INFO":
      resUrl += STUDENT_INFO;
      break;
    case "LESSON":
      resUrl += LESSON;
      break;
    case "SAVE_AVAILABLE_SCHEDULE":
      resUrl += SAVE_AVAILABLE_SCHEDULE;
      break;
    case "CALCULATE_TRAVEL_TIME":
      resUrl += CALCULATE_TRAVEL_TIME;
      break;
  }

  return process.env.REACT_APP_API_BASIC_URL + resUrl;
};

export const WEEKDAYS: DaysOfWeek[] = [
  "",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
export const TIMES = [
  "",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
