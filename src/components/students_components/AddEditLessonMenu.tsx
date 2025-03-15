import { useState } from "react";
import { defaultLessonInfo, LessonInfo } from "../../models/enums";
import { Lesson } from "../../models/lesson";
import { StudentInfo } from "../../models/studentInfo";
import InputText from "../main_components/reusable/InputText";
import MenuHeader from "../main_components/reusable/MenuHeader";
import Button from "../main_components/reusable/Button";
import DurationInput from "../main_components/reusable/DurationInput";
import InputNumber from "../main_components/reusable/InputNumber";
import { ColorPicker } from "../main_components/reusable/ColorPicker";

type Props = {
  studentInfo: StudentInfo;
  setStudentInfo: (studentInfo: StudentInfo) => void;
  type: string | "add";
  setAddLessonMenuOn: (addLessonMenuOn: undefined | "add" | "edit") => void;
  lesson?: Lesson;
};
export default function AddEditLessonMenu(props: Props) {
  const [lessonInfo, setLessonInfo] = useState(
    props.lesson ? props.lesson.lesson_info : defaultLessonInfo()
  );

  function changeLessonInfo(key: keyof LessonInfo, value: string) {
    console.log(key, value);

    setLessonInfo({ ...lessonInfo, [key]: value });
  }

  function saveLesson() {
    console.log("save");

    if (props.type !== "add") {
      let lessonIndex = props.studentInfo.lessons.findIndex(
        (lesson) => lesson.lessonId === props.lesson?.lessonId
      );
      if (lessonIndex === -1) return;
      props.studentInfo.lessons[lessonIndex].lesson_info = lessonInfo;
    } else {
      props.studentInfo.lessons.push({
        lessonId: Date.now().toString(),
        lesson_info: lessonInfo,
      });
    }

    props.setStudentInfo(props.studentInfo);
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
              value={lessonInfo.lesson}
              property={"lesson"}
              onChange={changeLessonInfo}
            />
            <DurationInput
              id={"weeklyDuration"}
              label={"Weekly duration"}
              value={lessonInfo.weeklyDuration}
              property={"weeklyDuration"}
              onChange={changeLessonInfo}
            />
            <InputNumber
              id={"pricePerHour"}
              label={"Price per hour"}
              value={lessonInfo.pricePerHour}
              property={"pricePerHour"}
              onChange={changeLessonInfo}
              suffix="€/h"
            />
            <ColorPicker
              color={lessonInfo.lessonColor}
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
