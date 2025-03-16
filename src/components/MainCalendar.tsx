import { useEffect, useState } from "react";
import { TeacherInfo } from "../models/teacherInfo";
import { LessonBlock } from "../models/enums";
import CalendarComp from "./main_components/CalendarComp";

type Props = {
  teacherInfo: TeacherInfo;
};
export default function MainCalendar(props: Props) {
  const [lessonBlocks, setLessonBlocks] = useState<LessonBlock[]>([]);

  useEffect(() => {
    if (props.teacherInfo) {
      let tempLessonBlocks = [];
      for (let student of props.teacherInfo.students) {
        for (let lesson of student.lessons) {
          for (let timeBlock of lesson.lesson_info.timeBlocks) {
            let tempLessonBlock = {
              studentId: student.studentId,
              studentName: student.name,
              lessonId: lesson.lessonId,
              lessonName: lesson.lesson_info.lesson,
              lessonTimeBlock: timeBlock,
              lessonColor: lesson.lesson_info.lessonColor,
              locked: timeBlock.locked,
            };

            tempLessonBlocks.push(tempLessonBlock);
          }
        }
      }
      setLessonBlocks(tempLessonBlocks);
    }
  }, [props.teacherInfo]);

  return (
    <>
      <div className="calendarBackground">
        <div className="calendarTitleContainer">
          <h1 className="calendarTitle">Weekly Schedule</h1>
        </div>
        <div className="calendarContainer">
          <CalendarComp
            availableSchedule={props.teacherInfo.availableSchedule}
            changeAvailableSchedule={() => {}}
            lessonBlocks={lessonBlocks}
          />
        </div>
      </div>
    </>
  );
}
