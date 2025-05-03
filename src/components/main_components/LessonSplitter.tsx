import { useState, useEffect } from "react";
import { LessonInfo, TimeString } from "../../models/enums";
import {
  formatTime,
  getDurationInMinutes,
} from "../../services/commonFunctions";

interface TimeSliceProps {
  weeklyHours: TimeString;
  color: string;
  timeBlocks: TimeString[];
  onChange: (key: keyof LessonInfo, value: string | TimeString[]) => void;
}

interface TimeSlice {
  id: number;
  minutes: number;
}

export default function LessonSplitter(props: TimeSliceProps) {
  const [slices, setSlices] = useState<TimeSlice[]>(convertTimeBlocks());
  const [sliceCount, setSliceCount] = useState(props.timeBlocks.length);
  const weeklyHoursInMinutes = getDurationInMinutes(props.weeklyHours);
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);

  useEffect(() => {
    console.log("mpika panw");

    const tempTimeBlocks = convertSlices(slices);
    if (tempTimeBlocks !== props.timeBlocks) {
      props.onChange("timeBlocks", tempTimeBlocks);
    }
    // eslint-disable-next-line
  }, [slices]);

  // Initialize or update slices when slice count changes
  useEffect(() => {
    console.log("mpika edw");

    if (!firstTimeLoad) {
      if (sliceCount > 0) {
        // Distribute hours equally
        const baseMinutes = weeklyHoursInMinutes / sliceCount;

        // If we have existing slices, try to preserve them
        if (slices.length > 0) {
          // If we're reducing slices, take the first n slices
          if (sliceCount < slices.length) {
            const newSlices = slices.slice(0, sliceCount);

            // Ensure total adds up to weeklyHours
            const totalMinutes = newSlices.reduce(
              (sum, slice) => sum + slice.minutes,
              0
            );
            if (Math.abs(totalMinutes - weeklyHoursInMinutes) > 0.01) {
              // Adjust last slice to make total correct
              newSlices[newSlices.length - 1].minutes +=
                weeklyHoursInMinutes - totalMinutes;
            }

            setSlices(newSlices);
            return;
          }

          // If we're adding slices, distribute remaining hours equally
          if (sliceCount > slices.length) {
            const existingTotal = slices.reduce(
              (sum, slice) => sum + slice.minutes,
              0
            );
            const remaining = weeklyHoursInMinutes - existingTotal;
            const newSliceMinutes =
              remaining > 0 ? remaining / (sliceCount - slices.length) : 0;

            const newSlices = [
              ...slices,
              ...Array.from({ length: sliceCount - slices.length }, (_, i) => ({
                id: slices.length + i,
                minutes: newSliceMinutes,
              })),
            ];

            setSlices(newSlices);
            return;
          }
        }

        // Create new slices with equal distribution
        const newSlices = Array.from({ length: sliceCount }, (_, i) => ({
          id: i,
          minutes: baseMinutes,
        }));

        setSlices(newSlices);
      }
    }
    // eslint-disable-next-line
  }, [sliceCount]);

  // Update when weekly hours change
  useEffect(() => {
    console.log("mpika ekei");

    if (firstTimeLoad) {
      setFirstTimeLoad(false);
    } else {
      if (slices.length > 0) {
        const ratio =
          weeklyHoursInMinutes /
          slices.reduce((sum, slice) => sum + slice.minutes, 0);

        console.log(ratio);

        if (!isNaN(ratio) && isFinite(ratio)) {
          let updatedSlices = slices.map((slice) => ({
            ...slice,
            minutes: Math.floor(slice.minutes * ratio),
          }));

          const totalMinutes = updatedSlices.reduce(
            (sum, slice) => sum + slice.minutes,
            0
          );
          console.log(totalMinutes);

          if (totalMinutes !== weeklyHoursInMinutes) {
            const firstSlice = updatedSlices[0];
            const newFirstSlice = {
              ...firstSlice,
              minutes:
                firstSlice.minutes +
                (totalMinutes < weeklyHoursInMinutes ? 1 : -1),
            };
            updatedSlices = [newFirstSlice, ...updatedSlices.slice(1)];
          }
          setSlices(updatedSlices);
        }
      }
    }
    // eslint-disable-next-line
  }, [weeklyHoursInMinutes]);

  function convertTimeBlocks(): TimeSlice[] {
    const timeBlocks = props.timeBlocks;
    return timeBlocks.map((timeBlock, index) => ({
      id: index,
      minutes: getDurationInMinutes(timeBlock),
    }));
  }

  function convertSlices(slices: TimeSlice[]): TimeString[] {
    let tempTimeBlocks: TimeString[] = [];
    for (let slice of slices) {
      let { hours, minutes } = formatHoursAndMinutes(slice.minutes);
      let timeBlock = formatTime(hours, minutes);
      tempTimeBlocks.push(timeBlock);
    }
    return tempTimeBlocks;
  }

  const handleMinutesChange = (index: number, value: string) => {
    const minutes = parseFloat(value) || 0;
    if (minutes < 0) return;
    if (minutes > weeklyHoursInMinutes) return;

    const newSlices = [...slices];
    const oldHours = newSlices[index].minutes;
    newSlices[index].minutes = minutes;

    // Calculate how much time needs to be redistributed
    const diff = oldHours - minutes;

    // Redistribute time only to slices to the right
    if (Math.abs(diff) > 0.01) {
      const rightSlices = newSlices.slice(index + 1);
      const rightTotal = rightSlices.reduce(
        (sum, slice) => sum + slice.minutes,
        0
      );

      if (rightTotal > 0) {
        // Distribute proportionally among slices to the right
        for (let i = index + 1; i < newSlices.length; i++) {
          const proportion = newSlices[i].minutes / rightTotal;
          newSlices[i].minutes += diff * proportion;

          // Ensure no negative hours
          if (newSlices[i].minutes < 0) newSlices[i].minutes = 0;
        }
      } else if (rightSlices.length > 0) {
        // If all right slices are 0, distribute equally
        const equalShare = diff / rightSlices.length;
        for (let i = index + 1; i < newSlices.length; i++) {
          newSlices[i].minutes += equalShare;

          // Ensure no negative hours
          if (newSlices[i].minutes < 0) newSlices[i].minutes = 0;
        }
      } else if (index > 0) {
        // If this is the last slice, adjust the previous slice
        newSlices[index - 1].minutes += diff;
        if (newSlices[index - 1].minutes < 0) newSlices[index - 1].minutes = 0;
      }
    }

    // Ensure total equals weeklyHours
    const totalHours = newSlices.reduce((sum, slice) => sum + slice.minutes, 0);
    if (Math.abs(totalHours - weeklyHoursInMinutes) > 0.01) {
      // Find the last non-zero slice that's not the current one
      let lastSliceIndex = -1;
      for (let i = newSlices.length - 1; i >= 0; i--) {
        if (i !== index && newSlices[i].minutes > 0) {
          lastSliceIndex = i;
          break;
        }
      }

      if (lastSliceIndex >= 0) {
        newSlices[lastSliceIndex].minutes += weeklyHoursInMinutes - totalHours;
        if (newSlices[lastSliceIndex].minutes < 0)
          newSlices[lastSliceIndex].minutes = 0;
      }
    }
    console.log(newSlices);

    setSlices(newSlices);
  };

  // Convert decimal hours to hours and minutes format
  const formatHoursAndMinutes = (weeklyHoursInMinutes: number) => {
    const hours = Math.floor(weeklyHoursInMinutes / 60);
    const minutes = weeklyHoursInMinutes % 60;

    // const hours = Math.floor(weeklyHoursInMinutes);
    // const minutes = Math.round((weeklyHoursInMinutes - hours) * 60);
    return { hours, minutes };
  };

  // Parse hours and minutes input to decimal hours
  const parseHoursMinutes = (hours: number, minutes: number) => {
    const hoursInMinutes = hours * 60 || 0;

    return hoursInMinutes + minutes;
  };

  return (
    <div className="lessonSplitterComponent">
      <div className="lessonBlocksNumberContainer">
        <p className="lessonBlocksNumberTitle">Lesson Blocks</p>
        <input
          type="number"
          min={0}
          step={1}
          max={4}
          className="lessonBlocksNumberInput"
          id={`lessonBlocksNumberInput`}
          value={sliceCount}
          onChange={(e: any) => {
            let value = parseInt(e.target.value) ?? 0;
            setSliceCount(value);
          }}
        />
      </div>
      <div className="lessonBlocksContainer">
        {slices.map((slice, index) => {
          const { hours, minutes } = formatHoursAndMinutes(slice.minutes);

          return (
            <div
              key={slice.id}
              className="blockTimeInputContainer"
              style={{ backgroundColor: props.color }}
            >
              <div className="blockTimeInputTitle">Block {index + 1}</div>
              <div className="blockTimeInputInnerContainer">
                <div className="blockTimeInputComponent">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    max={Math.floor(
                      getDurationInMinutes(props.weeklyHours) / 60
                    )}
                    className="blockTimeInput"
                    id={"lessonHoursInput-" + index}
                    value={hours}
                    onChange={(e) => {
                      const newHours = parseHoursMinutes(
                        parseInt(e.target.value),
                        minutes
                      );
                      handleMinutesChange(index, newHours.toString());
                    }}
                  />
                  <p className="blockTimeInputLabel">h</p>
                </div>
                <div className="blockTimeInputComponent">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    max={60}
                    className="blockTimeInput"
                    id={"lessonHoursInput-" + index}
                    value={minutes}
                    onChange={(e) => {
                      const newHours = parseHoursMinutes(
                        hours,
                        parseInt(e.target.value)
                      );
                      handleMinutesChange(index, newHours.toString());
                    }}
                  />
                  <p className="blockTimeInputLabel">m</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
