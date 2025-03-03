import { useState } from "react";
import Button from "../common/Button";
import Select from "../common/Select";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useFiltersStore } from "../../Store/filters";

const FilterBar = () => {
  const foodType = ["Plate", "Fastfood", "Drink", "Dessert"];
  const Categorie = ["diet", "sensitive", "disease"];
  const { filters, setFilter } = useFiltersStore();
  const [buttonValue, setButtonValue] = useState(
    <FaLocationDot className="h-4 w-4 mx-2 flex" />
  );
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilter("location", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setButtonValue(<MdOutlineDownloadDone className="h-6 w-6 mx-2 flex" />);
      });
    }
  };
  return (
    <div className="md:flex flex-col hidden   col-span-1 rounded min-h-[80vh] border border-prime p-2">
      <div className="flex justify-between px-2 items-center">
        <h1 className="text-2xl">FELTERS</h1>
        <Button className="hover:bg-prime duration-300 hover:text-light rounded p-2">
          Reset
        </Button>
      </div>
      <div className="flex w-full flex-col gap-1 ">
        <Button
          onClick={getLocation}
          className="border-prime flex justify-center items-center w-full border py-2 my-2 hover:bg-prime duration-500 rounded-lg "
        >
          {buttonValue} Use Your Location
        </Button>
        <Select
          options={foodType}
          value={filters.foodType}
          onchange={(v) => {
            setFilter("foodType", v);
          }}
          title="Type of food "
        />
        <Select
          options={Categorie}
          value={filters.categorie}
          onchange={(v) => {
            setFilter("categorie", v);
          }}
          title="Categorie"
        />
      </div>
    </div>
  );
};

export default FilterBar;
