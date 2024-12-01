import { DaysOfWeek } from "./enums";

export class TimeBlock {
  timeBlockId: string;
  day: DaysOfWeek;
  startTime: string;
  endTime: string;
  locked: boolean;
  constructor(
    timeBlockId: string,
    day: DaysOfWeek,
    startTime: string,
    endTime: string,
    locked: boolean
  ) {
    this.timeBlockId = timeBlockId;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.locked = locked;
  }
}
