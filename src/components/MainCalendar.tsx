import { useEffect, useState } from "react";
import { AvailableSchedule, LessonBlock } from "../models/enums";
import CalendarComp from "./main_components/CalendarComp";
import { useRecoilState } from "recoil";
import { teacherInfoState } from "../states/TeacherInfo";
import { deepCloneObject } from "../services/commonFunctions";
import { edit_teacher_info } from "../services/requests";
import Button from "./main_components/reusable/Button";

type Props = {};
export default function MainCalendar(props: Props) {
  const [lessonBlocks, setLessonBlocks] = useState<LessonBlock[]>([]);
  const [teacherInfo, setTeacherInfo] = useRecoilState(teacherInfoState);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (teacherInfo) {
      let tempLessonBlocks = [];
      for (let student of teacherInfo.students) {
        for (let lesson of student.lessons) {
          if (!lesson.lesson_info.lessonScheduledTimes) continue;
          for (let lessonScheduledTime of lesson.lesson_info
            .lessonScheduledTimes) {
            let tempLessonBlock: LessonBlock = {
              studentId: student.studentId,
              studentName: student.name,
              lessonId: lesson.lessonId,
              lessonName: lesson.lesson_info.lesson,
              lessonScheduledTime: lessonScheduledTime,
              lessonColor: lesson.lesson_info.lessonColor,
              locked: lessonScheduledTime.locked,
            };

            tempLessonBlocks.push(tempLessonBlock);
          }
        }
      }
      setLessonBlocks(tempLessonBlocks);
    }
  }, [teacherInfo]);

  function changeAvailableSchedule(availableSchedule: AvailableSchedule) {
    let tempTeacherInfo = deepCloneObject(teacherInfo);
    tempTeacherInfo.availableSchedule = availableSchedule;
    edit_teacher_info(tempTeacherInfo).then((response: any) => {
      if (response.status === 200) {
        setTeacherInfo(tempTeacherInfo);
      } else {
        window.alert(response.data.message);
      }
      console.log(response);
    });
  }

  return (
    <>
      <div className="calendarBackground">
        <div className="calendarTitleContainer">
          <h1 className="calendarTitle">Weekly Schedule</h1>
          <Button
            id={"editAvailableSchedule"}
            text={editMode ? "Close Editing" : "Edit Available Schedule"}
            onClick={() => setEditMode(!editMode)}
          />
        </div>
        <div className="calendarContainer">
          <CalendarComp
            availableSchedule={teacherInfo.availableSchedule}
            changeAvailableSchedule={changeAvailableSchedule}
            lessonBlocks={lessonBlocks}
            editMode={editMode}
          />
        </div>
      </div>
    </>
  );
}
