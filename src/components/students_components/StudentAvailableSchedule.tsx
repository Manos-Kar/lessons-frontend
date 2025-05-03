import CalendarComp from "../main_components/CalendarComp";
import { StudentInfo } from "../../models/studentInfo";
import AvailableScheduleThumbnail from "../AvailableScheduleThumbnail";
import { useState } from "react";
import { deepCloneObject } from "../../services/commonFunctions";
import { AvailableSchedule } from "../../models/enums";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
};
export default function StudentAvailableSchedule(props: Props) {
  const [calendarOn, setCalendarOn] = useState(false);

  function changeAvailableSchedule(availableSchedule: AvailableSchedule): void {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.availableSchedule = availableSchedule;

    props.setStudentInfo(tempStudentInfo);
  }

  return (
    <>
      <div
        className="studentMenuAvailableScheduleThumbnail"
        id="studentMenuAvailableScheduleThumbnail"
      >
        <AvailableScheduleThumbnail
          availableSchedule={props.studentInfo.availableSchedule}
          onClick={() => setCalendarOn(true)}
        />
        {calendarOn && (
          <div
            className="studentMenuCalendarContainer"
            id={"studentMenuCalendarContainer"}
          >
            <div
              className="studentMenuCalendarContainerClose"
              id={"studentMenuCalendarContainerClose"}
              onClick={() => setCalendarOn(false)}
            >
              <div
                className="studentMenuCalendarClosePopUp"
                id="studentMenuCalendarClosePopUp"
                onClick={() => setCalendarOn(false)}
              >
                X
              </div>
            </div>
            <p className="studentMenuCalendarTitle">
              Choose Available Schedule for{" "}
              {props.studentInfo.name !== ""
                ? props.studentInfo.name
                : "student"}
            </p>

            <CalendarComp
              availableSchedule={props.studentInfo.availableSchedule}
              changeAvailableSchedule={changeAvailableSchedule}
              student
              editMode
            />
          </div>
        )}
      </div>
    </>
  );
}
