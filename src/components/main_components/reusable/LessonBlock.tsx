import { useRef, useState } from "react";
import { Lesson } from "../../../models/lesson";
import bin from "../../../resources/images/bin.svg";
import DeleteItemPopup from "./DeleteItemPopup";
import { teacherInfoState } from "../../../states/TeacherInfoState";
import { useRecoilState, useRecoilValue } from "recoil";
import Draggable from "react-draggable";
import { deepCloneObject } from "../../../services/commonFunctions";
import { draggingBlockState } from "../../../states/DraggingBlockState";
import { DraggingBlock } from "../../../models/enums";

type Props = {
  lesson: Lesson;
  lessonIndex: number;
  setAddLessonMenuOn: (lessonId: string) => void;
  deleteLesson: (lessonId: string) => void;
  inPool?: boolean;
};
export default function LessonBlock(props: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [deletePopupOn, setDeletePopupOn] = useState(false);
  const teacherInfo = useRecoilValue(teacherInfoState);
  const [draggingBlock, setDraggingBlock] = useRecoilState(draggingBlockState);
  const myRef = useRef<HTMLDivElement>(null);

  const studentName = teacherInfo.students.find((student) =>
    student.lessons.find((lesson) => lesson.lessonId === props.lesson.lessonId)
  )?.name;

  const [isDragging, setIsDragging] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<{ x: number; y: number }[]>(
    new Array(props.lesson.lesson_info.timeBlocks.length).fill({ x: 0, y: 0 })
  );

  function handleStart(e: any, index: number) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    let tempDraggingBlock: DraggingBlock = deepCloneObject(draggingBlock);
    tempDraggingBlock.position = { x: mouseX, y: mouseY };
    tempDraggingBlock.blockIndex = index;
    tempDraggingBlock.lessonInfo = props.lesson.lesson_info;
    tempDraggingBlock.lessonId = props.lesson.lessonId;
    tempDraggingBlock.dragging = true;
    setDraggingBlock(tempDraggingBlock);
    setIsDragging(index);
  }

  function handleDrag(e: any, data: any, index: number) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let tempDraggingBlock = deepCloneObject(draggingBlock);
    tempDraggingBlock.position.x = mouseX;
    tempDraggingBlock.position.y = mouseY;
    setDraggingBlock(tempDraggingBlock);
    let tempPosition = deepCloneObject(position);
    tempPosition[index].x = data.deltaX;
    tempPosition[index].y = data.deltaY;
    setPosition(tempPosition);
    setIsDragging(index);
  }

  const handleStop = (e: any, data: any, index: number) => {
    const rect = e.target.getBoundingClientRect();
    let tempDraggingBlock = deepCloneObject(draggingBlock);
    tempDraggingBlock.position = { x: rect.left, y: rect.top };
    tempDraggingBlock.blockIndex = index;
    tempDraggingBlock.lessonInfo = props.lesson.lesson_info;
    tempDraggingBlock.dragging = false;
    setDraggingBlock(tempDraggingBlock);
    let tempPosition = deepCloneObject(position);
    tempPosition[index] = { x: 0, y: 0 };
    setPosition(tempPosition);
    setIsDragging(undefined);
    // const calendarRect = calendarRef.current?.getBoundingClientRect();

    // if (
    //   calendarRect &&
    //   data.x + e.target.offsetWidth / 2 > calendarRect.left &&
    //   data.x + e.target.offsetWidth / 2 < calendarRect.right &&
    //   data.y + e.target.offsetHeight / 2 > calendarRect.top &&
    //   data.y + e.target.offsetHeight / 2 < calendarRect.bottom
    // ) {
    //   console.log("Dropped in calendar");
    //   // Optionally: remove from pool, add to calendar
    // } else {
    // Snap back
    // setPosition({ x: 0, y: 0 });
    // }
  };
  return (
    <>
      <div
        className={`studentMenuLessonBlock ${props.inPool ? "inPool" : ""}`}
        key={`studentMenuLessonBlock-${props.lessonIndex}`}
        style={{ backgroundColor: props.lesson.lesson_info.lessonColor }}
        onClick={(e: any) => {
          let deletePopUpElement = document.getElementById(
            `deleteItemContainer-lesson-mini`
          );
          if (deletePopUpElement) return;
          if (e.target.id !== `lessonBin-${props.lessonIndex}`)
            props.setAddLessonMenuOn(props.lesson.lessonId);
        }}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        {props.inPool && (
          <div className="studentNameContainer">
            <div className="studentName">{studentName}</div>
          </div>
        )}
        {deletePopupOn && (
          <DeleteItemPopup
            onClose={() => setDeletePopupOn(false)}
            onDelete={() => props.deleteLesson(props.lesson.lessonId)}
            itemForDeletion={props.lesson.lesson_info.lesson}
            type="lesson-mini"
          />
        )}
        {showDelete && !isDragging && (
          <img
            className="lessonBin"
            id={`lessonBin-${props.lessonIndex}`}
            src={bin}
            alt="bin"
            onClick={() => setDeletePopupOn(true)}
          />
        )}
        <div
          className="studentMenuLessonBlockName"
          id={`studentMenuLessonBlockName-${props.lessonIndex}`}
        >
          {props.lesson.lesson_info.lesson}
        </div>
        <div className="studentMenuLessonBlockTimePriceContainer">
          <div
            className="studentMenuLessonBlockTime"
            id={`studentMenuLessonBlockTime-${props.lessonIndex}`}
          >
            {props.lesson.lesson_info.weeklyDuration} hrs/week
          </div>
          <div
            className="studentMenuLessonBlockPrice"
            id={`studentMenuLessonBlockPrice-${props.lessonIndex}`}
          >
            {props.lesson.lesson_info.pricePerHour} €/h
          </div>
        </div>
        <div className="studentMenuLessonBlockTimeBlockContainer">
          {props.lesson.lesson_info.timeBlocks.map((timeBlock, index) => {
            return (
              <Draggable
                defaultPosition={{ x: 0, y: 0 }}
                scale={1}
                key={`studentMenuLessonBlockTimeBlock-${index}`}
                position={position[index]}
                onStart={(e) => handleStart(e, index)}
                onStop={(e, data) => handleStop(e, data, index)}
                onDrag={(e, data) => handleDrag(e, data, index)}
                nodeRef={myRef as React.RefObject<HTMLElement>}
              >
                <div
                  className={`studentMenuLessonBlockTimeBlock ${
                    props.inPool ? "inPool" : ""
                  } ${isDragging === index ? "dragging" : ""}`}
                  style={{
                    backgroundColor: props.lesson.lesson_info.lessonColor,
                    visibility: isDragging === index ? "hidden" : "visible",
                  }}
                  key={`studentMenuLessonBlockTimeBlock-${index}`}
                  id={`studentMenuLessonBlockTimeBlock-${index}`}
                  ref={myRef}
                >
                  {timeBlock}
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
    </>
  );
}
