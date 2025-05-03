import { useEffect, useState } from "react";
import { StudentInfo } from "../../models/studentInfo";
import { teacherInfoState } from "../../states/TeacherInfo";
import { useRecoilState } from "recoil";
import StudentAvailableSchedule from "./StudentAvailableSchedule";
import StudentLessons from "./StudentLessons";
import InputText from "../main_components/reusable/InputText";
import MenuHeader from "../main_components/reusable/MenuHeader";
import Button from "../main_components/reusable/Button";
import {
  delete_student_info,
  edit_student_info,
  save_student_info,
} from "../../services/requests";
import { deepCloneObject } from "../../services/commonFunctions";
import { TeacherInfo } from "../../models/teacherInfo";
import DeleteItemPopup from "../main_components/reusable/DeleteItemPopup";

type Props = {
  setStudentMenuOn: (studentMenuOn: "add" | string | undefined) => void;
  type: string | "add" | undefined;
  studentId?: string;
};
export default function StudentMenu(props: Props) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(
    StudentInfo.emptyStudentInfo()
  );
  const [teacherInfo, setTeacherInfo] = useRecoilState(teacherInfoState);
  const [deletePopupOn, setDeletePopupOn] = useState(false);

  useEffect(() => {
    if (props.type !== "add") {
      for (let student of teacherInfo.students) {
        if (student.studentId === props.type) {
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

  function saveStudentInfo() {
    if (props.type === "add") {
      save_student_info(studentInfo).then((response: any) => {
        if (response.status === 200) {
          console.log(response);
          let tempTeacherInfo = deepCloneObject(teacherInfo) as TeacherInfo;

          tempTeacherInfo.students.push(studentInfo);

          setTeacherInfo(tempTeacherInfo);
          props.setStudentMenuOn(undefined);
        } else {
          console.log(response);
          window.alert("Error saving student info");
        }
      });
    } else {
      edit_student_info(studentInfo).then((response: any) => {
        if (response.status === 200) {
          console.log(response);
          let tempTeacherInfo = deepCloneObject(teacherInfo) as TeacherInfo;
          let studentIndex = teacherInfo.students.findIndex(
            (student) => student.studentId === studentInfo.studentId
          );

          tempTeacherInfo.students[studentIndex] = studentInfo;

          setTeacherInfo(tempTeacherInfo);
          props.setStudentMenuOn(undefined);
        } else {
          console.log(response);
          window.alert("Error saving student info");
        }
      });
    }
  }

  function deleteStudent() {
    delete_student_info(studentInfo.studentId).then((response: any) => {
      if (response.status === 200) {
        console.log(response);
        let tempTeacherInfo = deepCloneObject(teacherInfo) as TeacherInfo;
        let studentIndex = teacherInfo.students.findIndex(
          (student) => student.studentId === studentInfo.studentId
        );

        tempTeacherInfo.students.splice(studentIndex, 1);

        setTeacherInfo(tempTeacherInfo);
        props.setStudentMenuOn(undefined);
      } else {
        console.log(response);
        window.alert("Error deleting student info");
      }
    });
  }

  return (
    <>
      <div className="studentMenuContainer" id={"studentMenuContainer"}>
        <div className="studentMenuTop">
          <MenuHeader
            id={"studentMenu"}
            menuHeader={props.type !== "add" ? "Edit Student" : "Add Student"}
            type={props.type}
            onDelete={() => setDeletePopupOn(true)}
            onClickX={() => props.setStudentMenuOn(undefined)}
          />
          {deletePopupOn && (
            <DeleteItemPopup
              onClose={() => setDeletePopupOn(false)}
              onDelete={deleteStudent}
              itemForDeletion={studentInfo.name}
              type={"student"}
            />
          )}

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
              onClick={saveStudentInfo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
