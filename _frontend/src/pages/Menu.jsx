import { useState } from "react";
import FilterBar from "../components/layout/FilterBar";
import PlateContainer from "../components/layout/PlateContainer";
import Button from "../components/common/Button";
import Lottie from "lottie-react";
import filterIcon from "../images/FilterIconFromLottie.json";

const Menu = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="relative">
        {!showFilters && (
          <Button
            className={`absolute top-1 left-4 bg-light p-2 rounded-full border-2 border-prime z-51 `}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Lottie
              loop={true}
              animationData={filterIcon}
              className="h-8 w-8"
            />
          </Button>
        )}

        {showFilters && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        <div
          className={`fixed h-[calc(100vh-5rem)] md:w-1/2  lg:w-1/3 w-4/5  transform ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 overflow-y-auto`}
        >
          <FilterBar setShowFilters={setShowFilters} />
        </div>
      </div>

      <div>
        <PlateContainer />
      </div>
    </div>
  );
};

export default Menu;
