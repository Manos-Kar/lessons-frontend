import lockImg from "../../resources/images/lock.svg";
import { AvailableSchedule, LessonBlock } from "../../models/enums";
import { TIMES, WEEKDAYS } from "../../services/constants";
import { calculateTopPosition } from "../../services/commonFunctions";

type Props = {
  availableSchedule: AvailableSchedule;

  lessonBlocks?: LessonBlock[];
  student?: boolean;
};
export default function CalendarComp(props: Props) {
  if (props.student) {
    console.log(props.availableSchedule);
  }

  return (
    <>
      <div className={`${props.student ? "student" : ""} weekdaysContainer`}>
        {WEEKDAYS.map((day, dayIndex) => (
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
              props.availableSchedule
                .filter((availableSlot) => availableSlot[0] === day)
                .map((availableSlot, availableSlotIndex) => (
                  <div
                    className={`availableHoursBlock ${
                      props.student ? "student" : ""
                    }`}
                    key={`availableSlot-${availableSlotIndex}`}
                    style={{
                      top: calculateTopPosition!(
                        availableSlot[1],
                        availableSlot[2]
                      ).top,
                      height: calculateTopPosition!(
                        availableSlot[1],
                        availableSlot[2]
                      ).height,
                    }}
                  >
                    {props.student && (
                      <>
                        <div
                          className="availableHoursBlockHandle up"
                          id={`handle-${day}-${availableSlotIndex}-up`}
                        ></div>
                        <div
                          className="availableHoursBlockHandle down"
                          id={`handle-${day}-${availableSlotIndex}-down`}
                        ></div>
                      </>
                    )}
                  </div>
                ))}
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
