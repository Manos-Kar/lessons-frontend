import lockImg from "../../resources/images/lock.svg";
import {
  AvailableSchedule,
  DaysOfWeek,
  LessonBlock,
  TimeString,
} from "../../models/enums";
import { TIMES, WEEKDAYS } from "../../services/constants";
import {
  calculateTopPosition,
  deepCloneObject,
} from "../../services/commonFunctions";
import ScheduleBlock from "./ScheduleBlock";

type Props = {
  availableSchedule: AvailableSchedule;
  changeAvailableSchedule: (availableSchedule: AvailableSchedule) => void;
  lessonBlocks?: LessonBlock[];
  student?: boolean;
};
export default function CalendarComp(props: Props) {
  if (props.student) {
    // console.log(props.availableSchedule);
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
              props.lessonBlocks
                .filter(
                  (lessonBlock) => lessonBlock.lessonTimeBlock.day === day
                )
                .map((lessonBlock, availableSlotIndex) => (
                  <div
                    className="lessonBlock"
                    key={`lessonBlock-${availableSlotIndex}`}
                    style={{
                      backgroundColor: lessonBlock.lessonColor,
                      top: calculateTopPosition!(
                        lessonBlock.lessonTimeBlock.startTime,
                        lessonBlock.lessonTimeBlock.endTime
                      ).top,
                      height: calculateTopPosition!(
                        lessonBlock.lessonTimeBlock.startTime,
                        lessonBlock.lessonTimeBlock.endTime
                      ).height,
                    }}
                  >
                    <div className="lessonBlockRow">
                      <div className="lessonBlockTime">
                        {lessonBlock.lessonTimeBlock.startTime} -{" "}
                        {lessonBlock.lessonTimeBlock.endTime}
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
