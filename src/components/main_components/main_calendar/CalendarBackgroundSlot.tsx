import { useRecoilState } from "recoil";
import { TIMES } from "../../../services/constants";
import { draggingBlockState } from "../../../states/DraggingBlockState";
import { getDurationInMinutes } from "../../../services/commonFunctions";
import { DaysOfWeek } from "../../../models/enums";
import { useEffect } from "react";

type Props = {
  day: DaysOfWeek;
  dayIndex: number;
  highlightedSlots: `${DaysOfWeek}-${number}-${number}`[];
  setHighlightedSlots: (slots: `${DaysOfWeek}-${number}-${number}`[]) => void;
};
export default function CalendarBackgroundSlot(props: Props) {
  const [draggingBlock, setDraggingBlock] = useRecoilState(draggingBlockState);

  useEffect(() => {
    if (!draggingBlock.dragging) {
      props.setHighlightedSlots([]);
    }
    // eslint-disable-next-line
  }, [draggingBlock]);

  function calculateHighlightedSlots(slotIndex: number, quarter: number) {
    console.log("calculateHighlightedSlots", slotIndex, quarter);
    console.log(props.highlightedSlots);

    let lessonDuration =
      draggingBlock.lessonInfo.timeBlocks[draggingBlock.blockIndex];
    let lessonDurationInQuarters =
      Math.ceil(getDurationInMinutes(lessonDuration) / 15) - 1;

    let startSlot: `${DaysOfWeek}-${number}-${number}` = `${props.day}-${slotIndex}-${quarter}`;
    let tempHighlightedSlots = [startSlot];
    let tempQuarter = quarter;
    let tempSlot = slotIndex;
    for (let i = 0; i < lessonDurationInQuarters; i++) {
      let nextQuarter = tempQuarter + 1 > 4 ? 1 : tempQuarter + 1;
      let nextSlot = tempQuarter + 1 > 4 ? tempSlot + 1 : tempSlot;
      tempHighlightedSlots.push(`${props.day}-${nextSlot}-${nextQuarter}`);
      tempQuarter = nextQuarter;
      tempSlot = nextSlot;
    }

    props.setHighlightedSlots(tempHighlightedSlots);
  }

  return (
    <>
      {TIMES.map((slot, slotIndex) => (
        <div key={`${props.day}-${slot}`}>
          <div
            className={`time ${props.dayIndex === 0 ? "firstColumn" : ""} ${
              slotIndex === 0 && props.dayIndex !== 0 ? "firstRow" : ""
            } firstQuarter ${
              props.highlightedSlots.includes(`${props.day}-${slotIndex}-1`)
                ? "highlighted"
                : ""
            } ${
              props.highlightedSlots[0] === `${props.day}-${slotIndex}-1`
                ? "first"
                : props.highlightedSlots[props.highlightedSlots!.length - 1] ===
                  `${props.day}-${slotIndex}-1`
                ? "last"
                : ""
            }`}
            id={`${props.day}-${slotIndex}-firstQuarter`}
            onMouseEnter={(e: any) => {
              if (draggingBlock.dragging) {
                calculateHighlightedSlots(slotIndex, 1);
              }
            }}
            style={slotIndex === 0 ? { height: 20 } : undefined}
          >
            {slotIndex === 0 ? props.day : props.dayIndex === 0 ? slot : ""}
          </div>
          <div
            className={`time ${props.dayIndex === 0 ? "firstColumn" : ""} ${
              slotIndex === 0 && props.dayIndex !== 0 ? "firstRow" : ""
            } secondQuarter ${
              props.highlightedSlots.includes(`${props.day}-${slotIndex}-2`)
                ? "highlighted"
                : ""
            } ${
              props.highlightedSlots[0] === `${props.day}-${slotIndex}-2`
                ? "first"
                : props.highlightedSlots[props.highlightedSlots!.length - 1] ===
                  `${props.day}-${slotIndex}-2`
                ? "last"
                : ""
            }`}
            id={`${props.day}-${slotIndex}-secondQuarter`}
            style={slotIndex === 0 ? { height: 0 } : undefined}
            onMouseEnter={(e: any) => {
              if (draggingBlock.dragging) {
                calculateHighlightedSlots(slotIndex, 2);
              }
            }}
          >
            {slotIndex === 0 ? props.day : props.dayIndex === 0 ? slot : ""}
          </div>
          <div
            className={`time ${props.dayIndex === 0 ? "firstColumn" : ""} ${
              slotIndex === 0 && props.dayIndex !== 0 ? "firstRow" : ""
            } thirdQuarter ${
              props.highlightedSlots.includes(`${props.day}-${slotIndex}-3`)
                ? "highlighted"
                : ""
            } ${
              props.highlightedSlots[0] === `${props.day}-${slotIndex}-3`
                ? "first"
                : props.highlightedSlots[props.highlightedSlots!.length - 1] ===
                  `${props.day}-${slotIndex}-3`
                ? "last"
                : ""
            }`}
            id={`${props.day}-${slotIndex}-thirdQuarter`}
            style={slotIndex === 0 ? { height: 0 } : undefined}
            onMouseEnter={(e: any) => {
              if (draggingBlock.dragging) {
                calculateHighlightedSlots(slotIndex, 3);
              }
            }}
          >
            {slotIndex === 0 ? props.day : props.dayIndex === 0 ? slot : ""}
          </div>
          <div
            className={`time ${props.dayIndex === 0 ? "firstColumn" : ""} ${
              slotIndex === 0 && props.dayIndex !== 0 ? "firstRow" : ""
            } fourthQuarter ${
              props.highlightedSlots?.includes(`${props.day}-${slotIndex}-4`)
                ? "highlighted"
                : ""
            } ${
              props.highlightedSlots[0] === `${props.day}-${slotIndex}-4`
                ? "first"
                : props.highlightedSlots[props.highlightedSlots!.length - 1] ===
                  `${props.day}-${slotIndex}-4`
                ? "last"
                : ""
            }`}
            id={`${props.day}-${slotIndex}-fourthQuarter`}
            style={slotIndex === 0 ? { height: 0 } : undefined}
            onMouseEnter={(e: any) => {
              if (draggingBlock.dragging) {
                calculateHighlightedSlots(slotIndex, 4);
              }
            }}
          >
            {slotIndex === 0 ? props.day : props.dayIndex === 0 ? slot : ""}
          </div>
        </div>
      ))}
    </>
  );
}
