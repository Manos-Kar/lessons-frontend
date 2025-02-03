import Cookies from "js-cookie";
import { getUrl } from "./constants";
import { get, patch, post } from "./requestTemplates";
import { StudentInfo } from "../models/studentInfo";
import { Lesson } from "../models/lesson";
import { AvailableSchedule } from "../models/enums";

function getCredentialsFromCookie() {
  return Cookies.get("credentials");
}

function getHeaders() {
  const csrftoken = Cookies.get("csrftoken");
  console.log("CSRF Token sent:", Cookies.get("csrftoken"));

  let headers: any = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  const credentials = getCredentialsFromCookie();
  if (credentials) {
    headers["Authorization"] = `Basic ${credentials}`;
  }

  return headers;
}

//GET @api_get_teacher_info
export const get_teacher_info = async () => {
  const headers = getHeaders();
  try {
    return await get(getUrl("GET_TEACHER_INFO"), headers);
  } catch (error) {
    return error;
  }
};

//POST @api_student_info
export const save_student_info = async (studentInfo: StudentInfo) => {
  const headers = getHeaders();
  try {
    return await post(getUrl("STUDENT_INFO"), headers, {
      studentInfo: studentInfo,
    });
  } catch (error) {
    return error;
  }
};

//PATCH @api_student_info
export const edit_student_info = async (studentInfo: StudentInfo) => {
  const headers = getHeaders();
  try {
    return await patch(getUrl("STUDENT_INFO"), headers, {
      studentInfo: studentInfo,
    });
  } catch (error) {
    return error;
  }
};

//POST @api_lesson
export const save_lesson = async (lesson: Lesson) => {
  const headers = getHeaders();
  try {
    return await post(getUrl("LESSON"), headers, { lesson: lesson });
  } catch (error) {
    return error;
  }
};

//PATCH @api_lesson
export const edit_lesson = async (lesson: Lesson) => {
  const headers = getHeaders();
  try {
    return await patch(getUrl("LESSON"), headers, { lesson: lesson });
  } catch (error) {
    return error;
  }
};

//POST @api_save_prediction
export const save_available_schedule = async (
  availableSchedule: AvailableSchedule
) => {
  const headers = getHeaders();

  try {
    return await post(getUrl("SAVE_AVAILABLE_SCHEDULE"), headers, {
      availableSchedule: availableSchedule,
    });
  } catch (error) {
    return error;
  }
};

// POST @calculate_travel_time
export const calculateTravelTime = async (
  origin: string,
  destination: string
) => {
  const headers = getHeaders();
  console.log("request made with origin");
  console.log(origin);
  console.log("request made with destination");
  console.log(destination);

  try {
    return await post(getUrl("CALCULATE_TRAVEL_TIME"), headers, {
      origin: origin,
      destination: destination,
    });
  } catch (error) {
    return error;
  }
};

//POST @api_login
export const login = async (username: string, password: string) => {
  const headers = getHeaders();
  try {
    return await post(getUrl("LOGIN"), headers, {
      username: username,
      password: password,
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};

//GET @get_csrf_token
export const fetchCsrfToken = async () => {
  try {
    return await get(getUrl("GET_CSRF_TOKEN"), {});
  } catch (error) {
    return error;
  }
};
