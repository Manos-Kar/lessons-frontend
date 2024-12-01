import { TimeBlock } from "./timeBlock";

export class Lesson {
  lessonId: string;
  name: string;
  totalWeeklyDurationMinutes: number;
  timeBlocks: TimeBlock[];
  scheduled: boolean;
  constructor(
    lessonId: string,
    name: string,
    totalWeeklyDurationMinutes: number,
    timeBlocks: TimeBlock[],
    scheduled: boolean,
    pricePerHour: number
  ) {
    this.lessonId = lessonId;
    this.name = name;
    this.totalWeeklyDurationMinutes = totalWeeklyDurationMinutes;
    this.timeBlocks = timeBlocks;
    this.scheduled = scheduled;
    this.pricePerHour = pricePerHour;
  }
  pricePerHour: number;
}
