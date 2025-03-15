import CalendarComp from "../main_components/CalendarComp";
import { StudentInfo } from "../../models/studentInfo";
import AvailableScheduleThumbnail from "../AvailableScheduleThumbnail";
import { useState } from "react";
import { WEEKDAYS } from "../../services/constants";
import {
  addTimeToDate,
  calculateDiffernceInMinutes,
  deepCloneObject,
  getEndTime,
  getStartTime,
  timeToString,
} from "../../services/commonFunctions";
import { AvailableSchedule, DaysOfWeek } from "../../models/enums";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
};
export default function StudentAvailableSchedule(props: Props) {
  const [calendarOn, setCalendarOn] = useState(false);

  function addDay(day: DaysOfWeek) {
    let tempSchedule = ["14:00", "21:00"];
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.available_schedule[day].push(tempSchedule);
    props.setStudentInfo(tempStudentInfo);
  }

  function splitDay(day: DaysOfWeek) {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    let splitSchedule1: [string, string] = ["", ""];
    let splitSchedule2: [string, string] = ["", ""];

    let schedule = tempStudentInfo.available_schedule[day][0];

    let startTime = getStartTime(schedule);
    let endTime = getEndTime(schedule);
    if (calculateDiffernceInMinutes(startTime, endTime) > 60) {
      splitSchedule1 = [
        timeToString(startTime),
        addTimeToDate(
          startTime,
          calculateDiffernceInMinutes(startTime, endTime) / 2
        ),
      ];
      splitSchedule2 = [
        addTimeToDate(
          startTime,
          calculateDiffernceInMinutes(startTime, endTime) / 2
        ),
        timeToString(endTime),
      ];

      tempStudentInfo.available_schedule[day].splice(0, 1);
      tempStudentInfo.available_schedule[day].push(splitSchedule1);
      tempStudentInfo.available_schedule[day].push(splitSchedule2);
      tempStudentInfo.available_schedule[day].sort(
        (a: [string, string], b: [string, string]) => {
          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes; // Convert time to total minutes
          };

          return timeToMinutes(a[0]) - timeToMinutes(b[0]);
        }
      );

      props.setStudentInfo(tempStudentInfo);
    }
  }

  function removeDay(day: DaysOfWeek) {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.available_schedule[day] = [];

    props.setStudentInfo(tempStudentInfo);
  }

  function changeAvailableSchedule(availableSchedule: AvailableSchedule): void {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.available_schedule = availableSchedule;

    props.setStudentInfo(tempStudentInfo);
  }

  return (
    <>
      <div
        className="studentMenuAvailableScheduleThumbnail"
        id="studentMenuAvailableScheduleThumbnail"
      >
        <AvailableScheduleThumbnail
          available_schedule={props.studentInfo.available_schedule}
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
            <div className="addRemoveDayAvailabilityContainer">
              {WEEKDAYS.map((day, dayIndex) => (
                <div
                  className="addRemoveDayAvailability"
                  id={`addRemoveDayAvailability-${day}`}
                  key={day}
                >
                  {props.studentInfo.available_schedule[day].length > 0 ? (
                    <>
                      <div
                        className="removeDayButton"
                        onClick={() => removeDay(day)}
                      >
                        Clear slots for {day}
                      </div>
                      <div
                        className="splitDayButton"
                        onClick={() => splitDay(day)}
                      >
                        Split slots for {day}
                      </div>
                    </>
                  ) : (
                    <div className="addDayButton" onClick={() => addDay(day)}>
                      Add slot for {day}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <CalendarComp
              availableSchedule={props.studentInfo.available_schedule}
              changeAvailableSchedule={changeAvailableSchedule}
              student
            />
          </div>
        )}
      </div>
    </>
  );
}
