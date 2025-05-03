import { cloneDeep } from "lodash";
import { TimeString } from "../models/enums";

export const isDevEnv = () => process.env.REACT_APP_ENV === "dev";

export const getImageLink = (imageUrl: string) => {
  return isDevEnv()
    ? `http://localhost:8000/movies/uploads/${imageUrl}`
    : `https://www.manoskarystinos.com/movies/uploads/${imageUrl}`;
};

export function deepCloneObject(object: any): any {
  return cloneDeep(object);
}

export function calculateTopPosition(
  startingTime: string,
  endingTime: string,
  rowHeight: number = 16.05
) {
  let startTime = new Date(`1970-01-01T${startingTime}Z`);
  let endTime = new Date(`1970-01-01T${endingTime}Z`);
  let nineOClock = new Date(`1970-01-01T09:00:00Z`);
  let differenceInHoursForTop =
    (startTime.getTime() - nineOClock.getTime()) / (1000 * 60 * 60);
  let differenceInHoursForHeight =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  let extraPixels = Math.floor(differenceInHoursForTop);
  if (extraPixels < 0) extraPixels = 0;
  let top = differenceInHoursForTop * rowHeight * 4 + 21 + extraPixels;

  let extraPixelsForHeight = Math.floor(differenceInHoursForHeight);
  if (extraPixelsForHeight < 0) extraPixelsForHeight = 0;
  let height =
    differenceInHoursForHeight * rowHeight * 4 + extraPixelsForHeight;

  return {
    top: top,
    height: height,
  };
}

export function getStartTime(availableSchedule: [string, string]) {
  // 12:00 becomes 13:00, why?

  return new Date(`2025-01-01T${availableSchedule[0]}`);
}

export function getEndTime(availableSchedule: [string, string]) {
  return new Date(`2025-01-01T${availableSchedule[1]}`);
}

export function timeToString(time: Date) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export function addTimeToDate(date: Date, minutes: number) {
  return timeToString(new Date(date.getTime() + minutes * 60000));
}

export function calculateDiffernceInMinutes(startTime: Date, endTime: Date) {
  let differenceInMinutes =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  return differenceInMinutes;
}

export function parseTime(timeString: string) {
  const [hour, minute] = timeString.split(":").map(Number);
  return { hour, minute };
}

export function getDurationInMinutes(duration: TimeString) {
  const paresedDuration = parseTime(duration);
  const durationInMinutes = paresedDuration.hour * 60 + paresedDuration.minute;
  return durationInMinutes;
}

export function formatTime(hour: number, minute: number): TimeString {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}` as TimeString;
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
