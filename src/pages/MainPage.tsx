import Calendar from "../components/Calendar";
import Students from "../components/Students";
import GoogleAddress from "../components/GoogleAddress";
import { TeacherInfo } from "../models/teacherInfo";
import { useEffect, useState } from "react";
import { calculateTravelTime } from "../services/requests";

type Props = {
  teacherInfo: TeacherInfo;
};
export default function MainPage(props: Props) {
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
      <div className="leftSide">
        <div className="greetingContainer">
          {"Hi, " + props.teacherInfo.name}
        </div>
        <Calendar teacherInfo={props.teacherInfo} />
      </div>
      <div className="rightSide">
        <Students teacherInfo={props.teacherInfo} />

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
