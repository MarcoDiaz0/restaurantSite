/* eslint-disable react/prop-types */
import { useRestaurant } from "../../Store/restaurant";
import MapBox from "../common/MapBox";
import PlateContainer from "../layout/PlateContainer";

const RestaurantPage = () => {
  const {
    data: { latitude, longitude, restaurantName, coverPicture },
    plates,
  } = useRestaurant();
  return (
    <div className="flex w-full flex-col md:flex-row  ">
      <article className="bg-dark/80 p-3 md:w-1/3  w-full text-light  flex flex-col gap-5 ">
        <div className="text-center ">
          {coverPicture && (
            <img
              src={coverPicture}
              className="aspect-5/3 rounded-lg object-cover"
            />
          )}
          <h1 className=" text-3xl text-light underline w-full  ">
            Welcome To
          </h1>
          <h1 className=" text-3xl text-light  w-full ">{restaurantName}</h1>
        </div>
        <div className="relative min-h-60 items-center flex flex-col">
          <h1 className=" text-2xl text-light bg-gradient-to-b from-dark/30 w-full to-dark/90 z-502 absolute p-4  bottom-0">
            Restaurant Loaction
          </h1>
          <MapBox
            className={"w-full h-50 grow"}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </article>
      <article className="md:w-2/3 w-full">
        <PlateContainer plates={plates} />
      </article>
    </div>
  );
};

export default RestaurantPage;
