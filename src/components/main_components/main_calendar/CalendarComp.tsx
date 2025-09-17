import lockImg from "../../../resources/images/lock.svg";
import {
  AvailableSchedule,
  DaysOfWeek,
  LessonBlock,
  TimeString,
} from "../../../models/enums";
import { WEEKDAYS } from "../../../services/constants";
import {
  calculateTopPosition,
  deepCloneObject,
} from "../../../services/commonFunctions";
import ScheduleBlock from "./ScheduleBlock";
import EditCalendar from "./EditCalendar";
import CalendarBackgroundSlot from "./CalendarBackgroundSlot";
import { useState } from "react";

type Props = {
  availableSchedule: AvailableSchedule;
  changeAvailableSchedule: (availableSchedule: AvailableSchedule) => void;
  lessonBlocks?: LessonBlock[];
  student?: boolean;
  editMode: boolean;
};
export default function CalendarComp(props: Props) {
  const [highlightedSlots, setHighlightedSlots] = useState<
    `${DaysOfWeek}-${number}-${number}`[]
  >([]);

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
        <EditCalendar
          changeAvailableSchedule={props.changeAvailableSchedule}
          availableSchedule={props.availableSchedule}
          student={props.student}
        />
      )}

      <div className={`${props.student ? "student" : ""} weekdaysContainer`}>
        {weekdays.map((day, dayIndex) => (
          <div className={`slotContainer`} key={day}>
            <CalendarBackgroundSlot
              day={day as DaysOfWeek}
              dayIndex={dayIndex}
              highlightedSlots={highlightedSlots}
              setHighlightedSlots={setHighlightedSlots}
            />

            {props.availableSchedule &&
              day !== "" &&
              props.availableSchedule[day].map(
                (availableSlot, availableSlotIndex) => (
                  <ScheduleBlock
                    key={`availableSlot-${availableSlotIndex}`}
                    blockStartTime={availableSlot[0]}
                    blockEndTime={availableSlot[1]}
                    day={day}
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
