import filterIcon from "../../images/FilterIconFromLottie.json";
import Lottie from "lottie-react";
import Filters from "../common/Filters";
import { LocationButton } from "../common/LocationButton";

const FilterBar = () => {
  return (
    <div className="bg-dark">
      <div className="relative ">
        <div className="sticky h-15 top-0 mb-2 bg-prime w-full flex flex-row px-2 items-center z-20">
          <div className="text-3xl rounded">
            <Lottie loop={true} animationData={filterIcon} className="h-10 w-10 mx-2 flex" />
          </div>
          <h1 className="text-2xl">FILTERS</h1>
        </div>
        <div className="md:flex flex-col items-center rounded min-h-[80vh] p-2 m-2">
          <LocationButton color="" textColor="" />
          <div className="w-full text-light"><Filters /></div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
