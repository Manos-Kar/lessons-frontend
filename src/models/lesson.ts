import { LessonInfo } from "./enums";

export class Lesson {
  lessonId: string;
  lesson_info: LessonInfo;
  constructor(lessonId: string, lesson_info: LessonInfo) {
    this.lessonId = lessonId;
    this.lesson_info = lesson_info;
  }
}
