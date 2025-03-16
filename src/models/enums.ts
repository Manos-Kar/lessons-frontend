import { generateUUID } from "../services/commonFunctions";
import { COLORPALLETE as COLOR_PALLETE } from "../services/constants";
import { Lesson } from "./lesson";
import { TimeBlock } from "./timeBlock";

export type DaysOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type AvailableSchedule = {
  [day in DaysOfWeek]: [TimeString, TimeString][];
};

export function defaultAvailableSchedule(): AvailableSchedule {
  return {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };
}

export type LessonInfo = {
  lesson: string;
  timeBlocks: TimeBlock[];
  weeklyDuration: TimeString;
  pricePerHour: number;
  lessonColor: string;
};

export function defaultLesson(): Lesson {
  return {
    lessonId: generateUUID(),
    lesson_info: {
      lesson: "",
      timeBlocks: [],
      weeklyDuration: "00:00",
      pricePerHour: 0,
      lessonColor: randomPaletteColor(),
    },
  };
}

export function randomPaletteColor(): string {
  return COLOR_PALLETE[Math.floor(Math.random() * COLOR_PALLETE.length)];
}

export type LessonBlock = {
  studentId: string;
  studentName: string;
  lessonId: string;
  lessonName: string;
  lessonTimeBlock: TimeBlock;
  lessonColor: string;
  locked: boolean;
};

export type TimeString = `${number}:${number}`;
