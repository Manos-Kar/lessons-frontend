import { atom } from "recoil";
import { DraggingBlock } from "../models/enums";

export const draggingBlockState = atom<DraggingBlock>({
  key: "draggingBlockState",
  default: {
    lessonId: "",
    lessonInfo: {
      lesson: "",
      timeBlocks: [],
      lessonScheduledTimes: undefined,
      weeklyDuration: "00:00",
      pricePerHour: 0,
      lessonColor: "",
    },
    position: { x: 0, y: 0 },
    blockIndex: 0,
    dragging: false,
  },
});
