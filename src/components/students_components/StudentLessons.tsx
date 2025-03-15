import { useState } from "react";
import { StudentInfo } from "../../models/studentInfo";
import AddEditLessonMenu from "./AddEditLessonMenu";
import Button from "../main_components/reusable/Button";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
};
export default function StudentLessons(props: Props) {
  const [addLessonMenuOn, setAddLessonMenuOn] = useState<
    undefined | string | "add"
  >(undefined);

  return (
    <>
      <div className="studentMenuLessons" id="studentMenuLessons">
        <div className="studentMenuLessonsHeader" id="studentMenuLessonsHeader">
          Lessons
        </div>

        <Button
          id="studentMenuAddLesson"
          text="Add Lesson"
          onClick={() => setAddLessonMenuOn("add")}
        />

        {props.studentInfo.lessons.length > 0 && (
          <div
            className="studentMenuLessonsListContainer"
            id="studentMenuLessonsList"
          >
            <div className="studentMenuLessonsList" id="studentMenuLessonsList">
              {props.studentInfo.lessons.map((lesson, lessonIndex) => {
                return (
                  <div
                    className="studentMenuLesson"
                    key={`studentMenuLesson-${lessonIndex}`}
                    style={{ backgroundColor: lesson.lesson_info.lessonColor }}
                    onClick={() => setAddLessonMenuOn(lesson.lessonId)}
                  >
                    <div
                      className="studentMenuLessonName"
                      id={`studentMenuLessonName-${lessonIndex}`}
                    >
                      {lesson.lesson_info.lesson}
                    </div>
                    <div
                      className="studentMenuLessonTime"
                      id={`studentMenuLessonTime-${lessonIndex}`}
                    >
                      {lesson.lesson_info.weeklyDuration} hrs/week
                    </div>
                    <div
                      className="studentMenuLessonPrice"
                      id={`studentMenuLessonPrice-${lessonIndex}`}
                    >
                      {lesson.lesson_info.pricePerHour} €/h
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {addLessonMenuOn === "add" ? (
          <AddEditLessonMenu
            studentInfo={props.studentInfo}
            setStudentInfo={props.setStudentInfo}
            type={addLessonMenuOn}
            setAddLessonMenuOn={setAddLessonMenuOn}
          />
        ) : addLessonMenuOn !== undefined ? (
          <AddEditLessonMenu
            studentInfo={props.studentInfo}
            setStudentInfo={props.setStudentInfo}
            type={addLessonMenuOn}
            lesson={props.studentInfo.lessons.find(
              (lesson) => lesson.lessonId === addLessonMenuOn
            )}
            setAddLessonMenuOn={setAddLessonMenuOn}
          />
        ) : null}
      </div>
    </>
  );
}
