import { useState } from "react";
import { defaultLesson, LessonInfo } from "../../models/enums";
import { Lesson } from "../../models/lesson";
import { StudentInfo } from "../../models/studentInfo";
import InputText from "../main_components/reusable/InputText";
import MenuHeader from "../main_components/reusable/MenuHeader";
import Button from "../main_components/reusable/Button";
import DurationInput from "../main_components/reusable/DurationInput";
import InputNumber from "../main_components/reusable/InputNumber";
import { ColorPicker } from "../main_components/reusable/ColorPicker";
import { deepCloneObject } from "../../services/commonFunctions";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
  type: string | "add";
  setAddLessonMenuOn: (addLessonMenuOn: undefined | "add" | "edit") => void;
  lesson?: Lesson;
};
export default function AddEditLessonMenu(props: Props) {
  const [lesson, setLesson] = useState(
    props.lesson ? props.lesson : defaultLesson()
  );

  function changeLessonInfo(key: keyof LessonInfo, value: string) {
    let tempLesson = deepCloneObject(lesson);
    tempLesson.lesson_info[key] = value;

    setLesson(tempLesson);
  }

  function saveLesson() {
    console.log("save");

    let tempStudentInfo = deepCloneObject(props.studentInfo);
    if (props.type !== "add") {
      let lessonIndex = props.studentInfo.lessons.findIndex(
        (lesson) => lesson.lessonId === props.lesson?.lessonId
      );
      if (lessonIndex === -1) return;
      tempStudentInfo.lessons[lessonIndex].lesson_info = lesson.lesson_info;
    } else {
      tempStudentInfo.lessons.push(lesson);
    }

    props.setStudentInfo(tempStudentInfo);
    props.setAddLessonMenuOn(undefined);
    console.log("what??");
  }

  return (
    <>
      <div className="addLessonMenuContainer" id="addLessonMenu">
        <div className="addLessonMenuTop">
          <MenuHeader
            id={"addLessonMenu"}
            menuHeader={
              props.type === "edit" ? "Edit lesson" : "Add new lesson"
            }
            onClickX={() => props.setAddLessonMenuOn(undefined)}
          />

          <div className="addLessonMenu">
            <InputText
              id={"lessonName"}
              label={"Lesson name"}
              value={lesson.lesson_info.lesson}
              property={"lesson"}
              onChange={changeLessonInfo}
            />
            <DurationInput
              id={"weeklyDuration"}
              label={"Weekly duration"}
              value={lesson.lesson_info.weeklyDuration}
              property={"weeklyDuration"}
              onChange={changeLessonInfo}
            />
            <InputNumber
              id={"pricePerHour"}
              label={"Price per hour"}
              value={lesson.lesson_info.pricePerHour}
              property={"pricePerHour"}
              onChange={changeLessonInfo}
              suffix="€/h"
            />
            <ColorPicker
              color={lesson.lesson_info.lessonColor}
              label={"Lesson color"}
              setColor={(color) => changeLessonInfo("lessonColor", color)}
            />
          </div>
        </div>
        <div className="addLessonMenuBottom">
          <div className="saveLessonContainer">
            <Button
              id={"saveLesson"}
              text={"Save Lesson"}
              onClick={saveLesson}
            />
          </div>
        </div>
      </div>
    </>
  );
}
