import { useEffect, useState } from "react";
import { TeacherInfo } from "../models/teacherInfo";
import StudentMenu from "./StudentMenu";

type Props = {
  teacherInfo: TeacherInfo;
};
export default function Students(props: Props) {
  const [studentMenuOn, setStudentMenuOn] = useState(false);

  useEffect(() => {
    document.addEventListener("click", turnOffStudentMenu);

    return () => {
      document.removeEventListener("click", turnOffStudentMenu);
    };
    // eslint-disable-next-line
  }, []);

  function turnOffStudentMenu(e: any) {
    if (!e.target.id.includes("studentMenu")) {
      setStudentMenuOn(false);
    }
  }
  return (
    <>
      <div className="studentsComponent">
        <div className="studentsOverviewContainer">
          <h1 className="studentsOverviewHeader">Students Overview</h1>
          {props.teacherInfo.students.map((student, studentIndex) => {
            return (
              <div
                className="studentContainer"
                key={`studentContainer-${studentIndex}`}
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
            onClick={() => setStudentMenuOn(true)}
          >
            Add student
          </div>
        </div>
        {studentMenuOn && (
          <StudentMenu setStudentMenuOn={setStudentMenuOn} type={"add"} />
        )}
      </div>
    </>
  );
}
