import { useEffect, useState } from "react";
import { TeacherInfo } from "../models/teacherInfo";
import { TimeBlock } from "../models/timeBlock";
import lockImg from "../resources/images/lock.svg";

type Props = {
  teacherInfo: TeacherInfo;
};
export default function Calendar(props: Props) {
  const [lessonBlocks, setLessonBlocks] = useState<
    {
      studentId: string;
      studentName: string;
      lessonId: string;
      lessonName: string;
      lessonTimeBlock: TimeBlock;
      lessonColor: string;
      locked: boolean;
    }[]
  >([]);
  const rowHeight = 16;
  const weekdays = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = [
    "",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  useEffect(() => {
    if (props.teacherInfo) {
      let tempLessonBlocks = [];
      for (let student of props.teacherInfo.students) {
        for (let lesson of student.lessons) {
          for (let timeBlock of lesson.lesson_info.timeBlocks) {
            let tempLessonBlock = {
              studentId: student.studentId,
              studentName: student.name,
              lessonId: lesson.lessonId,
              lessonName: lesson.lesson_info.lesson,
              lessonTimeBlock: timeBlock,
              lessonColor: lesson.lesson_info.lessonColor,
              locked: timeBlock.locked,
            };

            tempLessonBlocks.push(tempLessonBlock);
          }
        }
      }
      setLessonBlocks(tempLessonBlocks);
    }
  }, [props.teacherInfo]);

  function calculateTopPosition(startingTime: string, endingTime: string) {
    let startTime = new Date(`1970-01-01T${startingTime}Z`);
    let endTime = new Date(`1970-01-01T${endingTime}Z`);
    let nineOClock = new Date(`1970-01-01T09:00:00Z`);
    let differenceInHoursForTop =
      (startTime.getTime() - nineOClock.getTime()) / (1000 * 60 * 60);
    let differenceInHoursForHeight =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    let extraPixels = Math.floor(differenceInHoursForTop);
    if (extraPixels < 0) extraPixels = 0;
    let top = differenceInHoursForTop * rowHeight * 4 + 21 + extraPixels;

    let extraPixelsForHeight = Math.floor(differenceInHoursForHeight);
    if (extraPixelsForHeight < 0) extraPixelsForHeight = 0;
    let height =
      differenceInHoursForHeight * rowHeight * 4 + extraPixelsForHeight;

    return {
      top: top,
      height: height,
    };
  }

  return (
    <>
      <div className="calendarBackground">
        <div className="calendarTitleContainer">
          <h1 className="calendarTitle">Weekly Schedule</h1>
        </div>
        <div className="calendarContainer">
          <div className="weekdaysContainer">
            {weekdays.map((day, dayIndex) => (
              <div className={`slotContainer`} key={day}>
                {times.map((slot, slotIndex) => (
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
                {props.teacherInfo &&
                  props.teacherInfo.available_schedule
                    .filter((availableSlot) => availableSlot[0] === day)
                    .map((availableSlot, availableSlotIndex) => (
                      <div
                        className="availableHoursBlock"
                        key={`availableSlot-${availableSlotIndex}`}
                        style={{
                          top: calculateTopPosition(
                            availableSlot[1],
                            availableSlot[2]
                          ).top,
                          height: calculateTopPosition(
                            availableSlot[1],
                            availableSlot[2]
                          ).height,
                        }}
                      ></div>
                    ))}
                {lessonBlocks
                  .filter(
                    (lessonBlock) => lessonBlock.lessonTimeBlock.day === day
                  )
                  .map((lessonBlock, availableSlotIndex) => (
                    <div
                      className="lessonBlock"
                      key={`lessonBlock-${availableSlotIndex}`}
                      style={{
                        backgroundColor: lessonBlock.lessonColor,
                        top: calculateTopPosition(
                          lessonBlock.lessonTimeBlock.startTime,
                          lessonBlock.lessonTimeBlock.endTime
                        ).top,
                        height: calculateTopPosition(
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
        </div>
      </div>
    </>
  );
}
