/* eslint-disable react/prop-types */
import Filters from "../common/Filters";
import { LocationButton } from "../common/LocationButton";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";

const FilterBar = ({ setShowFilters }) => {
  return (
    <div className="bg-dark/70">
      <div className="relative">
        <div className="sticky h-15 top-0 mb-2 bg-prime w-full flex px-2 gap-3 items-center z-20">
          <Button
            className={` bg-light w-8 h-8 rounded-full border-2 border-prime `}
            onClick={() => setShowFilters(false)}
          >
            <FaTimes className="w-full" />
          </Button>

          <h1 className="text-2xl  ">FILTERS</h1>
        </div>
        <div className="md:flex flex-col items-center rounded min-h-[80vh] p-2 m-2">
          <LocationButton color="" textColor="" />
          <div className="w-full text-light">
            <Filters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
