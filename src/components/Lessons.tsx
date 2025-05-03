import { useRecoilState } from "recoil";
import { teacherInfoState } from "../states/TeacherInfo";
import { Lesson } from "../models/lesson";
import { useEffect, useState } from "react";
import LessonBlock from "./main_components/reusable/LessonBlock";

type Props = {};
export default function Lessons(props: Props) {
  const [teacherInfo, setTeacherInfo] = useRecoilState(teacherInfoState);
  const [unscheduledLessons, setUnscheduledLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    let tempUnscheduledLessons: Lesson[] = [];
    if (teacherInfo) {
      for (let student of teacherInfo.students) {
        for (let lesson of student.lessons) {
          if (lesson.lesson_info.timeBlocks.length === 0) {
            tempUnscheduledLessons.push(lesson);
          }
        }
      }
      setUnscheduledLessons(tempUnscheduledLessons);
    }
  }, [teacherInfo]);

  return (
    <div className="lessonsComponent">
      <div className="lessonsTitleContainer">
        <h1 className="lessonsTitle">Lessons Pool</h1>
      </div>
      <div className="lessonsPoolContainer">
        {unscheduledLessons.map((lesson, lessonIndex) => {
          return (
            <LessonBlock
              key={`lessonBlock-${lessonIndex}`}
              lesson={lesson}
              lessonIndex={lessonIndex}
              setAddLessonMenuOn={() => {}}
              deleteLesson={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
