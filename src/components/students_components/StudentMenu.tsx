import { useEffect, useState } from "react";
import { StudentInfo } from "../../models/studentInfo";
import { teacherInfoState } from "../../states/TeacherInfo";
import { useRecoilValue } from "recoil";
import StudentAvailableSchedule from "./StudentAvailableSchedule";
import StudentLessons from "./StudentLessons";
import InputText from "../main_components/reusable/InputText";
import MenuHeader from "../main_components/reusable/MenuHeader";
import Button from "../main_components/reusable/Button";

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
        <div className="studentMenuTop">
          <MenuHeader
            id={"studentMenu"}
            menuHeader={props.type === "edit" ? "Edit Student" : "Add Student"}
            onClickX={() => props.setStudentMenuOn(false)}
          />

          <div className="studentMenuInputs" id={"studentMenuInputs"}>
            <div className="studentInfo" id={"studentInfo"}>
              <InputText
                id={"studentName"}
                label={"Name"}
                value={studentInfo.name}
                property={"name"}
                onChange={handleChangeStudenInfo}
              />
              <InputText
                id={"studentAddress"}
                label={"Address"}
                value={studentInfo.address}
                property={"address"}
                onChange={handleChangeStudenInfo}
              />
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
            <StudentLessons
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
            />
          </div>
        </div>
        <div className="studentMenuBottom">
          <div className="saveStudentContainer">
            <Button
              id={"saveStudent"}
              text={"Save Student"}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
