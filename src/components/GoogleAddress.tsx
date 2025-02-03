import GoogleAutoComplete from "react-google-autocomplete";

type Props = {
  onSelect: (address: google.maps.places.PlaceResult) => void;
  selectedAddress: google.maps.places.PlaceResult | "";
};
export default function GoogleAddress(props: Props) {
  // const thessalonikiBounds = new window.google.maps.LatLngBounds(
  //   new window.google.maps.LatLng(40.516667, 22.866669), // SW coordinates
  //   new window.google.maps.LatLng(40.716667, 23.066669) // NE coordinates
  // );

  return (
    <>
      <div className="studentsComponent">
        <div className="studentsOverviewContainer">
          <h1 className="studentsOverviewHeader">Address</h1>
          <GoogleAutoComplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            options={{
              types: ["address"],
              componentRestrictions: { country: "gr" },
              // bounds: thessalonikiBounds,
              // strictBounds: true,
            }}
            onPlaceSelected={(place) => {
              if (place.formatted_address) {
                console.log("Selected place:", place);

                props.onSelect(place);
              }
            }}
            style={{ width: "100%", padding: "8px" }}
            defaultValue={
              props.selectedAddress !== ""
                ? props.selectedAddress.formatted_address!
                : ""
            }
          />
        </div>
      </div>
    </>
  );
}
