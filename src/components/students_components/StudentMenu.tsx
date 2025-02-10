import { useEffect, useState } from "react";
import { StudentInfo } from "../../models/studentInfo";
import { teacherInfoState } from "../../states/TeacherInfo";
import { useRecoilValue } from "recoil";
import StudentAvailableSchedule from "./StudentAvailableSchedule";

type Props = {
  setStudentMenuOn: (value: boolean) => void;
  type: "edit" | "add";
  studentId?: string;
};
export default function StudentMenu(props: Props) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(
    StudentInfo.emptyStudentInfo()
  );
  const teacherInfo = useRecoilValue(teacherInfoState);

  useEffect(() => {
    if (props.type === "edit") {
      for (let student of teacherInfo.students) {
        if (student.studentId === props.studentId) {
          setStudentInfo(student);
        }
      }
    }
    // eslint-disable-next-line
  }, [props.studentId, props.type]);

  function handleChangeStudenInfo(key: keyof StudentInfo, value: string) {
    if (key === "address" || key === "name") {
      setStudentInfo({ ...studentInfo, [key]: value });
    }
  }

  return (
    <>
      <div className="studentMenuContainer" id={"studentMenuContainer"}>
        <div className="studentMenuClose" id={"studentMenuClose"}>
          <div className="closePopUp">X</div>
        </div>
        <div className="studentMenu" id={"studentMenu"}>
          <div className="studentMenuHeader" id={"studentMenuHeader"}>
            {props.type === "edit" ? "Edit Student" : "Add Student"}
          </div>
          <div className="studentMenuInputs" id={"studentMenuInputs"}>
            <div className="studentMenuInput" id={"studentMenuInputName"}>
              <div
                className="studentMenuInputLabel"
                id={"studentMenuInputLabelName"}
              >
                Name:
              </div>
              <div
                className="studentMenuInputField"
                id={"studentMenuInputFieldName"}
              >
                <input
                  type="text"
                  className="studentMenuInput"
                  id={"studentMenuInputName"}
                  value={studentInfo.name}
                  onChange={(e: any) =>
                    handleChangeStudenInfo("name", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="studentMenuInput" id={"studentMenuInputAddress"}>
              <div
                className="studentMenuInputLabel"
                id={"studentMenuInputLabelAddress"}
              >
                Address:
              </div>
              <div
                className="studentMenuInputField"
                id={"studentMenuInputFieldAddress"}
              >
                <input
                  type="text"
                  className="studentMenuInput"
                  id={"studentMenuInputAddress"}
                  value={studentInfo.address}
                  onChange={(e: any) =>
                    handleChangeStudenInfo("address", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="studentMenuAvailableScheduleContainer">
              <div
                className="studentMenuAvailableSchedule"
                id="studentMenuAvailableSchedule"
              >
                Available Schedule
              </div>
              <div
                className="studentMenuAvailableScheduleThumbnailContainer"
                id="studentMenuAvailableScheduleThumbnailContainer"
              >
                <StudentAvailableSchedule
                  studentInfo={studentInfo}
                  setStudentInfo={setStudentInfo}
                />
              </div>
            </div>
          </div>
          <div className="studentMenuLessons" id="studentMenuLessons">
            <div
              className="studentMenuLessonsHeader"
              id="studentMenuLessonsHeader"
            >
              Lessons
            </div>
            <div className="studentMenuLessonsList" id="studentMenuLessonsList">
              {studentInfo.lessons.map((lesson, lessonIndex) => {
                return (
                  <div
                    className="studentMenuLesson"
                    key={`studentMenuLesson-${lessonIndex}`}
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
                      {lesson.lesson_info.weeklyDuration}
                    </div>
                    <div
                      className="studentMenuLessonPrice"
                      id={`studentMenuLessonPrice-${lessonIndex}`}
                    >
                      {lesson.lesson_info.weeklyDuration}
                    </div>
                  </div>
                );
              })}
              <div
                className="studentMenuAddLessonButtonContainer"
                id="studentMenuAddLessonButtonContainer"
              >
                <div
                  className="studentMenuAddLessonButton"
                  id="studentMenuAddLessonButton"
                >
                  Add Lesson
                </div>
              </div>
            </div>
          </div>
          <div className="studentMenuButtonContainer">
            <div
              className="studentMenuButton"
              onClick={() => {
                props.setStudentMenuOn(false);
              }}
            >
              Save Student
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
