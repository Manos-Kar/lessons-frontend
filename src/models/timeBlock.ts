import { DaysOfWeek, TimeString } from "./enums";

export class TimeBlock {
  timeBlockId: string;
  day: DaysOfWeek;
  startTime: TimeString;
  endTime: TimeString;
  locked: boolean;
  constructor(
    timeBlockId: string,
    day: DaysOfWeek,
    startTime: TimeString,
    endTime: TimeString,
    locked: boolean
  ) {
    this.timeBlockId = timeBlockId;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.locked = locked;
  }
}
