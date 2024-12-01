const GET_TEACHER_INFO = "predict/api/get_teacher_info/";
const STUDENT_INFO = "predict/api/student_info/";
const LESSON = "predict/api/lesson/";
const SAVE_AVAILABLE_SCHEDULE = "predict/api/save_available_schedule/";
const LOGIN = "predict/login/";
const GET_CSRF_TOKEN = "predict/api/get_csrf_token/";

export type UrlOption =
  | "GET_TEACHER_INFO"
  | "GET_CSRF_TOKEN"
  | "LOGIN"
  | "STUDENT_INFO"
  | "LESSON"
  | "SAVE_AVAILABLE_SCHEDULE";

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
  }

  return process.env.REACT_APP_API_BASIC_URL + resUrl;
};
