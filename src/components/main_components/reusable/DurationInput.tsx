import { TimeString } from "../../../models/enums";
import { formatTime, parseTime } from "../../../services/commonFunctions";

type Props = {
  id: string;
  label: string;
  value: TimeString;
  property: string;
  onChange: (property: any, value: string) => void;
};
export default function DurationInput(props: Props) {
  return (
    <>
      <div
        className="durationInputContainer"
        id={`durationInputContainer-${props.id}`}
      >
        <div
          className="durationInputLabel"
          id={`durationInputLabel-${props.id}`}
        >
          {props.label}
        </div>
        <div
          className="durationInputField"
          id={`durationInputField-${props.id}`}
        >
          <input
            type="number"
            min={0}
            step={1}
            className="durationInput"
            id={`durationInputHours-${props.id}`}
            value={parseTime(props.value).hour}
            onChange={(e: any) => {
              let value = parseInt(e.target.value) ?? 0;
              if (value > 10) {
                value = 10;
              }
              props.onChange(
                props.property,
                formatTime(value, parseTime(props.value).minute)
              );
            }}
          />
          <p className="durationInputHoursDescription">Hours</p>
          <input
            type="number"
            min={0}
            max={59}
            step={1}
            className="durationInput"
            id={`durationInputMinutes-${props.id}`}
            value={parseTime(props.value).minute}
            onChange={(e: any) => {
              let value = parseInt(e.target.value) ?? 0;

              if (value > 59) {
                value = 59;
              }

              props.onChange(
                props.property,
                formatTime(parseTime(props.value).hour, value)
              );
            }}
          />
          <p className="durationInputHoursDescription">Minutes</p>
        </div>
      </div>
    </>
  );
}
