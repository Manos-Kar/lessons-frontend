import { TimeBlock } from "./timeBlock";

export type DaysOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type AvailableSchedule = [DaysOfWeek, string, string][];

export type LessonInfo = {
  lesson: string;
  timeBlocks: TimeBlock[];
  weeklyDuration: number;
  pricePerHour: number;
  lessonColor: string;
};
