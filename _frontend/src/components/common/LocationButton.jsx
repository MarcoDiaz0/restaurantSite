import Button from "./Button";
import Locationicon from "../../images/LocationIcon.json";
import { useState } from "react";
import Lottie from "lottie-react";
import check from "../../images/Check_custom_icon.json";


// eslint-disable-next-line react/prop-types
export const LocationButton = ({title,setState,className}) => {
    const [buttonValue, setButtonValue] = useState(
        <Lottie animationData={Locationicon} className="h-7 w-7  mx-2 flex" />
      );
      const getLocation = () => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              setState((ls) => ({
                ...ls,
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              }));              
              setButtonValue(
                <Lottie
                  animationData={check}
                  loop={false}
                  className="h-7 w-7 mx-2 flex"
                />
              );
            });
          }
        };
  return (
    <Button
      onClick={getLocation}
      className={className}
    >
      {buttonValue} {title}
    </Button>
  );
}
