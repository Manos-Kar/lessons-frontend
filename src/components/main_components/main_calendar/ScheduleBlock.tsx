import React, { useState, useRef, useEffect } from "react";
import { formatTime, parseTime } from "../../../services/commonFunctions";
import { DaysOfWeek, TimeString } from "../../../models/enums";

type Props = {
  blockStartTime: TimeString;
  blockEndTime: TimeString;
  timeSlotHeight: number;
  minutesPerSlot: number;
  calendarStartTime: TimeString;
  calendarEndTime: TimeString;
  limitStartTime: TimeString;
  limitEndTime: TimeString;
  editMode: boolean;
  day: DaysOfWeek;
  onTimeChange: (newAvailableSlot: [TimeString, TimeString]) => void;
};

export default function ScheduleBlock(props: Props) {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingTop, setIsResizingTop] = useState(false);
  const [isResizingBottom, setIsResizingBottom] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [initialTop, setInitialTop] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);

  // Calculate position and height based on times
  const parsedBlockStartTime = parseTime(props.blockStartTime);
  const parsedBlockEndTime = parseTime(props.blockEndTime);
  const parsedCalendarStartTime = parseTime(props.calendarStartTime);
  const parsedCalendarEndTime = parseTime(props.calendarEndTime);
  const parsedLimitStartTime = parseTime(props.limitStartTime);
  const parsedLimitEndTime = parseTime(props.limitEndTime);

  const startTimeInMinutes =
    (parsedBlockStartTime.hour - parsedCalendarStartTime.hour) * 60 +
    parsedBlockStartTime.minute;
  const endTimeInMinutes =
    (parsedBlockEndTime.hour - parsedCalendarStartTime.hour) * 60 +
    parsedBlockEndTime.minute;
  const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

  const topPosition =
    (startTimeInMinutes / props.minutesPerSlot) * props.timeSlotHeight + 19;
  const blockHeight =
    (durationInMinutes / props.minutesPerSlot) * props.timeSlotHeight;

  // Handle mouse down events for dragging and resizing
  const handleMouseDown = (
    e: React.MouseEvent,
    action: "drag" | "resizeTop" | "resizeBottom"
  ) => {
    if (!props.editMode) return;
    e.preventDefault();
    e.stopPropagation();

    if (blockRef.current) {
      // Get coordinates relative to the scheduler container
      const rect = blockRef.current.getBoundingClientRect();
      const containerRect =
        blockRef.current.parentElement?.getBoundingClientRect() || rect;

      setDragStartY(e.clientY);
      setInitialTop(rect.top - containerRect.top);
      setInitialHeight(rect.height);

      if (action === "drag") {
        setIsDragging(true);
      } else if (action === "resizeTop") {
        setIsResizingTop(true);
      } else if (action === "resizeBottom") {
        setIsResizingBottom(true);
      }
    }
  };

  // Handle mouse move for all interactions
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging && !isResizingTop && !isResizingBottom) return;

    const deltaY = e.clientY - dragStartY;

    if (isDragging && blockRef.current) {
      // Calculate new top position
      const newTop = initialTop + deltaY;
      const pixelsPerMinute = props.timeSlotHeight / props.minutesPerSlot;

      // Convert pixels to minutes, rounding to nearest time slot
      const minutesFromTop = Math.max(
        0,
        Math.round(newTop / pixelsPerMinute / props.minutesPerSlot) *
          props.minutesPerSlot
      );

      // Calculate new times
      let newStartHour =
        Math.floor(minutesFromTop / 60) + parsedCalendarStartTime.hour;
      let newStartMinute = minutesFromTop % 60;

      if (
        newStartHour <= parsedLimitStartTime.hour &&
        newStartMinute < parsedLimitStartTime.minute
      ) {
        return;
      }

      // Keep the same duration
      const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
      const totalNewStartMinutes = newStartHour * 60 + newStartMinute;
      const totalNewEndMinutes = totalNewStartMinutes + durationInMinutes;

      let newEndHour = Math.floor(totalNewEndMinutes / 60);
      let newEndMinute = totalNewEndMinutes % 60;

      if (
        newEndHour >= parsedLimitEndTime.hour &&
        (parsedLimitEndTime.minute === 0
          ? newEndMinute > 0
          : newEndMinute >= parsedLimitEndTime.minute)
      ) {
        newEndHour = parsedLimitEndTime.hour;
        newEndMinute = parsedLimitEndTime.minute;
        newStartHour = newEndHour - Math.floor(durationInMinutes / 60);
        newStartMinute = Math.abs(newEndMinute - (durationInMinutes % 60));
      }

      // Update times
      props.onTimeChange([
        formatTime(newStartHour, newStartMinute),
        formatTime(newEndHour, newEndMinute),
      ]);
    }

    if (isResizingTop && blockRef.current) {
      // Calculate new top and height
      const newTop = initialTop + deltaY;
      const newHeight = initialHeight - deltaY;

      if (newHeight > props.timeSlotHeight) {
        // Ensure minimum height
        const pixelsPerMinute = props.timeSlotHeight / props.minutesPerSlot;

        // Convert pixels to minutes, rounding to nearest time slot
        const minutesFromTop = Math.max(
          0,
          Math.round(newTop / pixelsPerMinute / props.minutesPerSlot) *
            props.minutesPerSlot
        );

        // Calculate new start time
        const newStartHour =
          Math.floor(minutesFromTop / 60) + parsedCalendarStartTime.hour;
        const newStartMinute = minutesFromTop % 60;

        // Update times, keeping the end time fixed
        props.onTimeChange([
          formatTime(newStartHour, newStartMinute),
          props.blockEndTime,
        ]);
      }
    }

    if (isResizingBottom && blockRef.current) {
      // Calculate new height
      const newHeight = initialHeight + deltaY;

      if (newHeight > props.timeSlotHeight) {
        // Ensure minimum height
        const pixelsPerMinute = props.timeSlotHeight / props.minutesPerSlot;

        // Convert total height to minutes, rounding to nearest time slot
        const newDurationInMinutes =
          Math.round(newHeight / pixelsPerMinute / props.minutesPerSlot) *
          props.minutesPerSlot;

        // Calculate the end time based on start time plus duration
        const totalEndMinutes = startTimeInMinutes + newDurationInMinutes;
        let newEndHour = Math.min(
          23,
          Math.floor(totalEndMinutes / 60) + parsedCalendarStartTime.hour
        );
        let newEndMinute = totalEndMinutes % 60;

        if (newEndHour > parsedCalendarEndTime.hour) {
          newEndHour = parsedCalendarEndTime.hour;
          newEndMinute = 0;
        }

        // Update times, keeping the start time fixed
        props.onTimeChange([
          props.blockStartTime,
          formatTime(newEndHour, newEndMinute),
        ]);
      }
    }
  };

  // Handle mouse up to stop all interactions
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizingTop(false);
    setIsResizingBottom(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging || isResizingTop || isResizingBottom) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [
    isDragging,
    isResizingTop,
    isResizingBottom,
    dragStartY,
    initialTop,
    initialHeight,
  ]);

  return (
    <div
      ref={blockRef}
      className={`scheduleBlockContainer ${
        props.editMode ? "cursor-grab" : ""
      } ${isDragging && props.editMode ? "cursor-grabbing" : ""} ${
        (isResizingTop || isResizingBottom) && props.editMode
          ? "cursor-ns-resize"
          : ""
      }`}
      style={{
        top: `${topPosition}px`,
        height: `${blockHeight}px`,
        pointerEvents: props.editMode ? "auto" : "none",
      }}
      id={`scheduleBlockContainer-${props.day}-${props.blockStartTime}-${props.blockEndTime}`}
      onMouseDown={(e) => handleMouseDown(e, "drag")}
    >
      {/* Resize handle - top */}
      <div
        className={`scheduleBlockHandle top ${
          props.editMode ? "cursor-ns-resize" : ""
        }`}
        onMouseDown={(e) => handleMouseDown(e, "resizeTop")}
      />

      {/* Content */}
      <div className="scheduleBlock"></div>

      {/* Resize handle - bottom */}
      <div
        className={`scheduleBlockHandle bottom ${
          props.editMode ? "cursor-ns-resize" : ""
        }`}
        onMouseDown={(e) => handleMouseDown(e, "resizeBottom")}
      />
    </div>
  );
}
