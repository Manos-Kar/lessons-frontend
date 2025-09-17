import { AvailableSchedule, DaysOfWeek } from "../../../models/enums";
import {
  addTimeToDate,
  calculateDiffernceInMinutes,
  deepCloneObject,
  getEndTime,
  getStartTime,
  timeToString,
} from "../../../services/commonFunctions";
import { WEEKDAYS } from "../../../services/constants";

type Props = {
  changeAvailableSchedule: (availableSchedule: AvailableSchedule) => void;
  availableSchedule: AvailableSchedule;
  student?: boolean;
};
export default function EditCalendar(props: Props) {
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

  return (
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
              <div className="removeDayButton" onClick={() => removeDay(day)}>
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
  );
}
