import lockImg from "../../resources/images/lock.svg";
import {
  AvailableSchedule,
  DaysOfWeek,
  LessonBlock,
  TimeString,
} from "../../models/enums";
import { TIMES, WEEKDAYS } from "../../services/constants";
import {
  addTimeToDate,
  calculateDiffernceInMinutes,
  calculateTopPosition,
  deepCloneObject,
  getEndTime,
  getStartTime,
  timeToString,
} from "../../services/commonFunctions";
import ScheduleBlock from "./ScheduleBlock";

type Props = {
  availableSchedule: AvailableSchedule;
  changeAvailableSchedule: (availableSchedule: AvailableSchedule) => void;
  lessonBlocks?: LessonBlock[];
  student?: boolean;
  editMode: boolean;
};
export default function CalendarComp(props: Props) {
  if (props.student) {
    // console.log(props.availableSchedule);
  }

  console.log(props.availableSchedule);

  function addDay(day: DaysOfWeek) {
    let tempSchedule = ["14:00", "21:00"];
    let tempAvailableSchedule = deepCloneObject(props.availableSchedule);
    tempAvailableSchedule[day].push(tempSchedule);
    props.changeAvailableSchedule(tempAvailableSchedule);
  }

  function splitDay(day: DaysOfWeek) {
    let tempAvailableSchedule = deepCloneObject(props.availableSchedule);
    let splitSchedule1: [string, string] = ["", ""];
    let splitSchedule2: [string, string] = ["", ""];

    let schedule = tempAvailableSchedule[day][0];

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

      tempAvailableSchedule[day].splice(0, 1);
      tempAvailableSchedule[day].push(splitSchedule1);
      tempAvailableSchedule[day].push(splitSchedule2);
      tempAvailableSchedule[day].sort(
        (a: [string, string], b: [string, string]) => {
          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes; // Convert time to total minutes
          };

          return timeToMinutes(a[0]) - timeToMinutes(b[0]);
        }
      );

      props.changeAvailableSchedule(tempAvailableSchedule);
    }
  }

  function removeDay(day: DaysOfWeek) {
    let tempAvailableSchedule = deepCloneObject(props.availableSchedule);

    tempAvailableSchedule[day] = [];

    props.changeAvailableSchedule(tempAvailableSchedule);
  }

  const weekdays: (DaysOfWeek | "")[] = ["", ...WEEKDAYS];

  function changeScheduleBlock(
    day: DaysOfWeek,
    availableSlotIndex: number,
    newAvailableSlot: [TimeString, TimeString]
  ) {
    let tempAvailableSchedule = deepCloneObject(props.availableSchedule);

    tempAvailableSchedule[day][availableSlotIndex] = newAvailableSlot;
    props.changeAvailableSchedule(tempAvailableSchedule);
  }

  return (
    <>
      {props.editMode && (
        <div
          className={`${
            props.student ? "student" : ""
          } addRemoveDayAvailabilityContainer`}
        >
          {WEEKDAYS.map((day, dayIndex) => (
            <div
              className={`${
                props.student ? "student" : ""
              } addRemoveDayAvailability`}
              id={`addRemoveDayAvailability-${day}`}
              key={day}
            >
              {props.availableSchedule[day].length > 0 ? (
                <>
                  <div
                    className="removeDayButton"
                    onClick={() => removeDay(day)}
                  >
                    Clear slots for {day}
                  </div>
                  <div className="splitDayButton" onClick={() => splitDay(day)}>
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
      )}

      <div className={`${props.student ? "student" : ""} weekdaysContainer`}>
        {weekdays.map((day, dayIndex) => (
          <div className={`slotContainer`} key={day}>
            {TIMES.map((slot, slotIndex) => (
              <div key={`${day}-${slot}`}>
                <div
                  className={`time ${dayIndex === 0 ? "firstColumn" : ""} ${
                    slotIndex === 0 && dayIndex !== 0 ? "firstRow" : ""
                  } firstQuarter`}
                  style={slotIndex === 0 ? { height: 20 } : undefined}
                >
                  {slotIndex === 0 ? day : dayIndex === 0 ? slot : ""}
                </div>
                <div
                  className={`time ${dayIndex === 0 ? "firstColumn" : ""} ${
                    slotIndex === 0 && dayIndex !== 0 ? "firstRow" : ""
                  } secondQuarter`}
                  style={slotIndex === 0 ? { height: 0 } : undefined}
                >
                  {slotIndex === 0 ? day : dayIndex === 0 ? slot : ""}
                </div>
                <div
                  className={`time ${dayIndex === 0 ? "firstColumn" : ""} ${
                    slotIndex === 0 && dayIndex !== 0 ? "firstRow" : ""
                  } thirdQuarter`}
                  style={slotIndex === 0 ? { height: 0 } : undefined}
                >
                  {slotIndex === 0 ? day : dayIndex === 0 ? slot : ""}
                </div>
                <div
                  className={`time ${dayIndex === 0 ? "firstColumn" : ""} ${
                    slotIndex === 0 && dayIndex !== 0 ? "firstRow" : ""
                  } fourthQuarter`}
                  style={slotIndex === 0 ? { height: 0 } : undefined}
                >
                  {slotIndex === 0 ? day : dayIndex === 0 ? slot : ""}
                </div>
              </div>
            ))}
            {props.availableSchedule &&
              day !== "" &&
              props.availableSchedule[day].map(
                (availableSlot, availableSlotIndex) => (
                  <ScheduleBlock
                    key={`availableSlot-${availableSlotIndex}`}
                    blockStartTime={availableSlot[0]}
                    blockEndTime={availableSlot[1]}
                    timeSlotHeight={16.4}
                    minutesPerSlot={15}
                    calendarStartTime={"09:00"}
                    calendarEndTime={"23:00"}
                    editMode={props.editMode}
                    onTimeChange={(newAvailableSlot) =>
                      changeScheduleBlock(
                        day,
                        availableSlotIndex,
                        newAvailableSlot
                      )
                    }
                    limitStartTime={
                      availableSlotIndex === 0
                        ? "09:00"
                        : props.availableSchedule[day][
                            availableSlotIndex - 1
                          ][1]
                    }
                    limitEndTime={
                      availableSlotIndex ===
                      props.availableSchedule[day].length - 1
                        ? "23:00"
                        : props.availableSchedule[day][
                            availableSlotIndex + 1
                          ][0]
                    }
                  />
                )
              )}
            {props.lessonBlocks &&
              props.editMode === false &&
              props.lessonBlocks
                .filter(
                  (lessonBlock) => lessonBlock.lessonScheduledTime.day === day
                )
                .map((lessonBlock, availableSlotIndex) => (
                  <div
                    className="lessonBlock"
                    key={`lessonBlock-${availableSlotIndex}`}
                    style={{
                      backgroundColor: lessonBlock.lessonColor,
                      top: calculateTopPosition!(
                        lessonBlock.lessonScheduledTime.startTime,
                        lessonBlock.lessonScheduledTime.endTime
                      ).top,
                      height: calculateTopPosition!(
                        lessonBlock.lessonScheduledTime.startTime,
                        lessonBlock.lessonScheduledTime.endTime
                      ).height,
                    }}
                  >
                    <div className="lessonBlockRow">
                      <div className="lessonBlockTime">
                        {lessonBlock.lessonScheduledTime.startTime} -{" "}
                        {lessonBlock.lessonScheduledTime.endTime}
                      </div>
                      <div className="lessonBlockTitle">
                        {lessonBlock.lessonName}
                      </div>
                    </div>
                    <div className="lessonBlockRow">
                      <div className="studentName">
                        {lessonBlock.studentName}
                      </div>
                      <div className="lockedImgContainer">
                        {lessonBlock.locked && (
                          <img src={lockImg} alt="" className="lockImage" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        ))}
      </div>
    </>
  );
}
