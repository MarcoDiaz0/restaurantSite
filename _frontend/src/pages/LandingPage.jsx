import Select from "../components/common/Select";
import Button from "../components/common/Button";
// import axios from "axios";
import { MdOutlineDownloadDone } from "react-icons/md";

import { useState } from "react";
const LandingPage = () => {
  const foodType = ["Plate", "Fastfood", "Drink", "Dessert"];
  const Categorie = ["diet", "sensitive", "disease"];
  const [location, setLocation] = useState(null);
  const [buttonValue, setButtonValue] = useState();
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setButtonValue((<MdOutlineDownloadDone className="h-7 w-7 flex"/>));
      });
      
    }
  };
  

  return (
    <div className={` backgroundImageMD text-light md:py-30  flex`}>
      <div className=" text-center bg-dark/80 md:min-w-1/2 px-2  rounded-3xl m-auto py-10">
        <h1 className="text-4xl">Find food and drinks online</h1>
        <div className="flex w-full md:w-3/5 flex-col md:flex-row gap-2 justify-self-center justify-around">
          <Select options={foodType} title="Type of food " />
          <Select options={Categorie} title="Categorie" />
        </div>
        <div className="flex flex-col w-full justify-self-center sm:w-3/5  ">
          <Button
            onClick={getLocation}
            className="border-prime flex justify-center items-center w-full border py-2 my-2 hover:bg-prime duration-200 rounded-lg "
          >
            {buttonValue} Use Your Location
          </Button>
          <Button className="border-prime w-full border py-2 my-2 hover:bg-prime duration-200 rounded-lg ">
            Get Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
