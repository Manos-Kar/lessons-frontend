import { useState } from "react";
import { Lesson } from "../../../models/lesson";
import bin from "../../../resources/images/bin.svg";
import DeleteItemPopup from "./DeleteItemPopup";

type Props = {
  lesson: Lesson;
  lessonIndex: number;
  setAddLessonMenuOn: (lessonId: string) => void;
  deleteLesson: (lessonId: string) => void;
};
export default function LessonBlock(props: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [deletePopupOn, setDeletePopupOn] = useState(false);

  return (
    <>
      <div
        className="studentMenuLessonBlock"
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
        {deletePopupOn && (
          <DeleteItemPopup
            onClose={() => setDeletePopupOn(false)}
            onDelete={() => props.deleteLesson(props.lesson.lessonId)}
            itemForDeletion={props.lesson.lesson_info.lesson}
            type="lesson-mini"
          />
        )}
        {showDelete && (
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
        <div className="studentMenuLessonBlockTimeBlockContainer">
          {props.lesson.lesson_info.timeBlocks.map((timeBlock, index) => {
            return (
              <div
                className="studentMenuLessonBlockTimeBlock"
                key={`studentMenuLessonBlockTimeBlock-${index}`}
                id={`studentMenuLessonBlockTimeBlock-${index}`}
              >
                {timeBlock}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
