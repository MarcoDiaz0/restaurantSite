/* eslint-disable react/prop-types */
import Lottie from "lottie-react"
import Locationicon from "../../images/LocationIcon.json"
import check from "../../images/Check_custom_icon.json";
import { useState } from "react";
import Button from "./Button";

export const LocationButton = ({ className, setlocation,credentials }) => {
  const [button, setButton] = useState(
    <Lottie animationData={Locationicon}  className="h-7 w-7 mx-2 flex !text-black" />
  );
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setlocation({
          ...credentials,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        setButton(
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
      className={` flex justify-center items-center ${className} w-full py-2 my-2 hover:bg-prime duration-500 rounded-lg  `}
    >
      {button}
      <span className="text-light">Get Location</span>
    </Button>
  );
};

