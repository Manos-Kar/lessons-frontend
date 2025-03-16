import { AvailableSchedule } from "../models/enums";
import { WEEKDAYS } from "../services/constants";

type Props = {
  availableSchedule: AvailableSchedule;
  onClick: () => void;
};
export default function AvailableScheduleThumbnail(props: Props) {
  // console.log(props.availableSchedule);

  return (
    <>
      <div
        className="studentMenuWeekdaysContainer"
        id={"studentMenuWeekdaysContainer"}
        onClick={props.onClick}
      >
        {WEEKDAYS.map((day, dayIndex) => {
          return (
            <div key={day}>
              <div
                className={`studentMenuWeekdaysSlotContainer`}
                id={`studentMenuWeekdaysSlotContainer`}
                key={day}
              >
                {day.substring(0, 1).toUpperCase()}
                {props.availableSchedule[day].map(
                  (availableSlot, availableSlotIndex) => (
                    <div
                      className="studentMenuWeekdayAvailableBlock"
                      id="studentMenuWeekdayAvailableBlock"
                      key={`availableSlot-${availableSlotIndex}`}
                    ></div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
