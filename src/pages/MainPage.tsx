import MainCalendar from "../components/MainCalendar";
import Students from "../components/main_components/Students";
import GoogleAddress from "../components/GoogleAddress";
import { TeacherInfo } from "../models/teacherInfo";
import { useEffect, useState } from "react";
import { calculateTravelTime } from "../services/requests";
import { useRecoilValue } from "recoil";
import { teacherInfoState } from "../states/TeacherInfoState";
import LessonsPool from "../components/LessonsPool";
import { draggingBlockState } from "../states/DraggingBlockState";
import DraggingBlock from "../components/main_components/reusable/DraggingBlock";

type Props = {};
export default function MainPage(props: Props) {
  const teacherInfo = useRecoilValue(teacherInfoState);
  const draggingBlock = useRecoilValue(draggingBlockState);

  // const [selectedAddress1, setSelectedAddress1] = useState<
  //   google.maps.places.PlaceResult | ""
  // >("");
  // const [selectedAddress2, setSelectedAddress2] = useState<
  //   google.maps.places.PlaceResult | ""
  // >("");

  // const [travelDistance, setTravelDistance] = useState<
  //   { time: string; distance: string } | undefined
  // >(undefined);

  // useEffect(() => {
  //   if (selectedAddress1 !== "" && selectedAddress2 !== "") {
  //     calculateTravelTime(
  //       selectedAddress1.formatted_address!,
  //       selectedAddress2.formatted_address!
  //     ).then((res: any) => {
  //       if (res.status === 200) {
  //         if (
  //           res.data.rows &&
  //           res.data.rows[0] &&
  //           res.data.rows[0].elements[0].distance &&
  //           res.data.rows[0].elements[0].distance.text &&
  //           res.data.rows[0].elements[0].duration.text
  //         ) {
  //           setTravelDistance({
  //             time: res.data.rows[0].elements[0].duration.text,
  //             distance: res.data.rows[0].elements[0].distance.text,
  //           });
  //         } else {
  //           setTravelDistance(undefined);
  //         }
  //       } else {
  //         setTravelDistance(undefined);
  //       }
  //       console.log(res);
  //     });
  //   }
  // }, [selectedAddress1, selectedAddress2]);

  return (
    <>
      {draggingBlock.dragging && <DraggingBlock />}
      <div className="leftSide">
        <div className="greetingContainer">{"Hi, " + teacherInfo.callName}</div>
        <MainCalendar />
      </div>
      <div className="rightSide">
        <Students />
        <LessonsPool />
        {/* <div>Time to travel and distance:</div>
        {travelDistance && travelDistance.time && (
          <div>
            Time: {travelDistance.time} Distance: {travelDistance.distance}
          </div>
        )} */}
      </div>
    </>
  );
}
