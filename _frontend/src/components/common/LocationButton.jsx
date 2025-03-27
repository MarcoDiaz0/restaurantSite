import { useState } from "react"; 
import PropTypes from "prop-types"; 
import Lottie from "lottie-react"; 
import Button from "./Button"; 
import Locationicon from "../../images/LocationIcon.json"; 
import check from "../../images/Check_custom_icon.json"; 
import { useFiltersStore } from "../../Store/filters";

export const LocationButton = ({ color = "bg-transparent", textColor = "text-light" }) => {
  const { filters, setFilter, buttonState, setButtonState } = useFiltersStore();
  {/*console.log(filters);
  console.log(buttonState);*/}

  const [loadingLocation, setLoadingLocation] = useState(false);

  const defaultIcon = <Lottie animationData={Locationicon} className="h-7 w-7 mx-2 flex" />;
  const successIcon = <Lottie animationData={check} loop={false} className="h-7 w-7 mx-2 flex" />;

  const [buttonIcon, setButtonIcon] = useState(buttonState.icon || defaultIcon);
  const [buttonText, setButtonText] = useState(buttonState.text || "Use Your Location");

  const getLocation = async () => {
    if (filters.location.latitude) {
      setFilter("location", { latitude: null, longitude: null });
      setButtonIcon(defaultIcon);
      setButtonText("Use Your Location");
      setButtonState(defaultIcon, "Use Your Location");
      return;
    }

    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    setButtonText("Getting Location...");

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setFilter("location", newLocation);
      setButtonIcon(successIcon);
      setButtonText("Location Set");
      setButtonState(successIcon, "Location Set");
    } catch (error) {
      console.error("Error getting location:", error);
      alert("Failed to get location. Please enable location services.");

      setButtonIcon(defaultIcon);
      setButtonText("Use Your Location");
      setButtonState(defaultIcon, "Use Your Location");
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <Button 
      onClick={getLocation} 
      className={`border-prime flex justify-center items-center ${color} ${textColor} w-full border py-2 my-2 hover:bg-prime duration-500 rounded-lg relative z-10`}
    >
      {buttonIcon} 
      <span className="text-light">{buttonText}</span>
    </Button>
  );
};

LocationButton.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
};
