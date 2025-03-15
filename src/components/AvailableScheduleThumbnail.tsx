import { AvailableSchedule } from "../models/enums";
import { WEEKDAYS } from "../services/constants";

type Props = {
  available_schedule: AvailableSchedule;
  onClick: () => void;
};
export default function AvailableScheduleThumbnail(props: Props) {
  // console.log(props.available_schedule);

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
                {props.available_schedule[day].map(
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
