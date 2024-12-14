import Calendar from "../components/Calendar";
import Students from "../components/Students";
import { TeacherInfo } from "../models/teacherInfo";

type Props = {
  teacherInfo: TeacherInfo;
};
export default function MainPage(props: Props) {
  return (
    <>
      <div className="leftSide">
        <div className="greetingContainer">
          {"Hi, " + props.teacherInfo.name}
        </div>
        <Calendar teacherInfo={props.teacherInfo} />
      </div>
      <div className="rightSide">
        <Students teacherInfo={props.teacherInfo} />
      </div>
    </>
  );
}
