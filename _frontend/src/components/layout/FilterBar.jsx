/* eslint-disable react/prop-types */
import Filters from "../common/Filters";
import { LocationButton } from "../common/LocationButton";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import { useFilterPlates } from "../../hooks/usePlate";
import { useFiltersStore } from "../../Store/filters";
import { useEffect, useState } from "react";

const FilterBar = ({ setShowFilters }) => {
  const { filterPlates } = useFilterPlates()
  const {  setFilter } = useFiltersStore();
  const [location ,setLocation] = useState({location: {latitude: null, longitude: null} })
  
  useEffect(() => {
    setFilter("location", location.location);
  }, [location, setFilter]);
  return (
    <div className="bg-dark/70 w-full">
      <div className="relative">
        <div className="sticky h-15 top-0 mb-2 bg-prime w-full flex px-2 gap-3 items-center ">
          <Button
            className={` bg-light w-8 h-8 rounded-full border-2 border-prime `}
            onClick={() => setShowFilters(false)}
          >
            <FaTimes className="w-full" />
          </Button>

          <h1 className="text-2xl">FILTERS</h1>
        </div>
        <div className="md:flex flex-col items-center rounded min-h-[80vh] p-2 m-2">
          <LocationButton
            setlocation={setLocation}
            credentials={location}
            className={"border border-light"}
          />
          <div className="w-full text-light">
            <Filters />
          </div>
          <Button
            onClick={() => filterPlates()}
            className="sticky bottom-10 mb-3 hover:bg-light hover:text-black duration-300 rounded-lg text-light bg-prime w-full p-2 text-center "
          >
            GO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
