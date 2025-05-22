import { useEffect, useState } from "react";
import FilterBar from "../components/layout/FilterBar";
import PlateContainer from "../components/layout/PlateContainer";
import Button from "../components/common/Button";
import Lottie from "lottie-react";
import filterIcon from "../images/FilterIconFromLottie.json";
import { authSlice } from "../Store/user";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRestaurant } from "../Store/restaurant";
import { useHighRatedPlates } from "../hooks/usePlate";
import { useGetRestaurant } from "../hooks/useRestaurant";
import { useFiltersStore } from "../Store/filters";
import { useGetFavourites } from "../hooks/useCustomer";

const Menu = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { getPlates } = useHighRatedPlates();
  const { getFavourites } = useGetFavourites();
  const { filteredPlates } = useFiltersStore();
  const { getRestaurantData } = useGetRestaurant();
  const { plates } = useRestaurant();
  const {
    auth: { _id, isOwner },
  } = authSlice();
  useEffect(() => {
    if (isOwner) getRestaurantData(_id);
    else getPlates();
    if (!isOwner && _id) getFavourites();
  }, []);
  return (
    <div className="min-h-[70vh]">
      <div>
        {isOwner ? (
          <Link to={"/createPlate"}>
            <Button
              className={`fixed left-4  bg-light p-2 m-2 rounded-full border-2 border-prime z-51 `}
            >
              <FaPlus className="w-8 h-8 " />
            </Button>
          </Link>
        ) : (
          <Button
            className={`fixed left-4 bg-light p-2 m-2 rounded-full border-2 border-prime z-51 `}
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
          />
        )}

        <div
          className={`fixed h-[calc(100vh-5rem)] md:w-1/2  lg:w-1/3 w-4/5  transform ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-52 overflow-y-auto`}
        >
          <FilterBar setShowFilters={setShowFilters} />
        </div>
      </div>

      <div className="md:w-7/10 mx-auto py-2 ">
        <PlateContainer plates={isOwner ? plates : filteredPlates} />
      </div>
    </div>
  );
};

export default Menu;
