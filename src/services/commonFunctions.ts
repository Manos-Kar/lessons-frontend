import { cloneDeep } from "lodash";
import { AvailableSchedule, DaysOfWeek } from "../models/enums";

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
  rowHeight: number = 16
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

export function getStartTime(available_schedule: [DaysOfWeek, string, string]) {
  // 12:00 becomes 13:00, why?

  return new Date(`2025-01-01T${available_schedule[1]}`);
}

export function getEndTime(available_schedule: [DaysOfWeek, string, string]) {
  return new Date(`2025-01-01T${available_schedule[2]}`);
}

export function timeToString(time: Date) {
  console.log(time);

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
