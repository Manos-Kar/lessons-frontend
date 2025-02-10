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
import { DaysOfWeek } from "../../models/enums";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
};
export default function StudentAvailableSchedule(props: Props) {
  const [calendarOn, setCalendarOn] = useState(false);

  function addDay(day: DaysOfWeek) {
    let tempDay = [day, "12:00", "16:00"];
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.available_schedule.push(tempDay);
    props.setStudentInfo(tempStudentInfo);
  }

  function splitDay(day: DaysOfWeek) {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    let splitSchedule1: [DaysOfWeek, string, string] = ["", "", ""];
    let splitSchedule2: [DaysOfWeek, string, string] = ["", "", ""];
    let indexToRemove = -1;

    for (let [
      index,
      schedule,
    ] of tempStudentInfo.available_schedule.entries()) {
      if (schedule[0] !== day) continue;
      let startTime = getStartTime(schedule);
      let endTime = getEndTime(schedule);
      if (calculateDiffernceInMinutes(startTime, endTime) > 60) {
        console.log(timeToString(startTime));
        console.log(calculateDiffernceInMinutes(startTime, endTime));

        splitSchedule1 = [
          day,
          timeToString(startTime),
          addTimeToDate(
            startTime,
            calculateDiffernceInMinutes(startTime, endTime) / 2
          ),
        ];
        splitSchedule2 = [
          day,
          addTimeToDate(
            startTime,
            calculateDiffernceInMinutes(startTime, endTime) / 2
          ),
          timeToString(endTime),
        ];
        indexToRemove = index;
        break;
      }
    }

    if (indexToRemove >= 0) {
      tempStudentInfo.available_schedule.splice(indexToRemove, 1);
      tempStudentInfo.available_schedule.push(splitSchedule1);
      tempStudentInfo.available_schedule.push(splitSchedule2);
      props.setStudentInfo(tempStudentInfo);
    }
  }

  function removeDay(day: DaysOfWeek) {
    let tempStudentInfo = deepCloneObject(props.studentInfo);
    tempStudentInfo.available_schedule =
      tempStudentInfo.available_schedule.filter(
        (schedule: [DaysOfWeek, string, string]) => schedule[0] !== day
      );
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
              {WEEKDAYS.filter((day) => day !== "").map((day, dayIndex) => (
                <div
                  className="addRemoveDayAvailability"
                  id={`addRemoveDayAvailability-${day}`}
                  key={day}
                >
                  {props.studentInfo.available_schedule.filter(
                    (availableSlot) => availableSlot[0] === day
                  ).length > 0 ? (
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
              student
            />
          </div>
        )}
      </div>
    </>
  );
}
