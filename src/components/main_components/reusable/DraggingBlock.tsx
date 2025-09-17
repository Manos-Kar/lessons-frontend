import { useRecoilValue } from "recoil";
import { teacherInfoState } from "../../../states/TeacherInfoState";
import { draggingBlockState } from "../../../states/DraggingBlockState";
import { getDurationInMinutes } from "../../../services/commonFunctions";

type Props = {};
export default function DraggingBlock(props: Props) {
  const teacherInfo = useRecoilValue(teacherInfoState);
  const draggingBlock = useRecoilValue(draggingBlockState);

  function findBlockHeight() {
    let blockDuration = getDurationInMinutes(
      draggingBlock.lessonInfo.timeBlocks[draggingBlock.blockIndex]
    );
    let hourlyHeight = 60;

    return (blockDuration * hourlyHeight) / 60 - 2;
  }

  function findStudentName() {
    return teacherInfo.students.find((student) =>
      student.lessons.find(
        (lesson) => lesson.lessonId === draggingBlock.lessonId
      )
    )?.name;
  }

  function findBlockPrice() {
    let blockDuration = getDurationInMinutes(
      draggingBlock.lessonInfo.timeBlocks[draggingBlock.blockIndex]
    );
    let pricePerHour = draggingBlock.lessonInfo.pricePerHour;
    return ((blockDuration * pricePerHour) / 60).toFixed(2) + "€";
  }

  return (
    <div
      className="draggingLessonBlock"
      id={`draggingLessonBlock-${draggingBlock.blockIndex}`}
      style={{
        left: draggingBlock.position.x - 25,
        top: draggingBlock.position.y - 5,
        height: findBlockHeight(),
        backgroundColor: draggingBlock.lessonInfo.lessonColor,
        pointerEvents: "none",
      }}
    >
      <div className="topPart">
        <p className="draggingLessonBlockStudent">{findStudentName()}</p>
        <p className="draggingLessonBlockLesson">
          {draggingBlock.lessonInfo.lesson}
        </p>
      </div>
      <div className="bottomPart">
        <p className="draggingLessonBlockDuration">
          {draggingBlock.lessonInfo.timeBlocks[draggingBlock.blockIndex]}
        </p>
        <p className="draggingLessonBlockPrice">{findBlockPrice()}</p>
      </div>
    </div>
  );
}
