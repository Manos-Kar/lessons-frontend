import { useState } from "react";
import StudentMenu from "../students_components/StudentMenu";
import { useRecoilValue } from "recoil";
import { teacherInfoState } from "../../states/TeacherInfo";

type Props = {};
export default function Students(props: Props) {
  const [studentMenuOn, setStudentMenuOn] = useState<
    "add" | string | undefined
  >(undefined);
  const teacherInfo = useRecoilValue(teacherInfoState);
  console.log(teacherInfo);

  return (
    <>
      <div className="studentsComponent">
        <div className="studentsOverviewContainer">
          <h1 className="studentsOverviewHeader">Students Overview</h1>
          {teacherInfo.students.map((student, studentIndex) => {
            return (
              <div
                className="studentContainer"
                key={`studentContainer-${studentIndex}`}
                onClick={() => {
                  console.log("click");
                  console.log(student.studentId);

                  setStudentMenuOn(student.studentId);
                }}
              >
                <div className="studentIndex">{studentIndex + 1}.</div>
                <div className="studentName">{student.name}</div>
                <div className="studentLessons">
                  Lessons: {student.lessons.length}
                </div>
              </div>
            );
          })}
        </div>
        <div className="addStudentContainer">
          <div
            className="addStudentButton"
            id="studentMenu-toggleButton"
            onClick={() => setStudentMenuOn("add")}
          >
            Add student
          </div>
        </div>
        {studentMenuOn === "add" ? (
          <StudentMenu
            setStudentMenuOn={setStudentMenuOn}
            type={studentMenuOn}
          />
        ) : studentMenuOn !== undefined ? (
          <StudentMenu
            setStudentMenuOn={setStudentMenuOn}
            type={studentMenuOn}
          />
        ) : null}
      </div>
    </>
  );
}
