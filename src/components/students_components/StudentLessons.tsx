import { useState } from "react";
import { StudentInfo } from "../../models/studentInfo";
import AddEditLessonMenu from "./AddEditLessonMenu";
import Button from "../main_components/reusable/Button";
import LessonBlock from "../main_components/reusable/LessonBlock";
import { deepCloneObject } from "../../services/commonFunctions";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
};
export default function StudentLessons(props: Props) {
  const [addLessonMenuOn, setAddLessonMenuOn] = useState<
    undefined | string | "add"
  >(undefined);

  function deleteLesson(lessonId: string) {
    let tempStudentInfo = deepCloneObject(props.studentInfo) as StudentInfo;
    tempStudentInfo.lessons = tempStudentInfo.lessons.filter(
      (lesson) => lesson.lessonId !== lessonId
    );
    props.setStudentInfo(tempStudentInfo);
  }

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
                  <LessonBlock
                    key={`lessonBlock-${lessonIndex}`}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                    setAddLessonMenuOn={setAddLessonMenuOn}
                    deleteLesson={deleteLesson}
                  />
                );
              })}
            </div>
          </div>
        )}
        {addLessonMenuOn !== undefined ? (
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
