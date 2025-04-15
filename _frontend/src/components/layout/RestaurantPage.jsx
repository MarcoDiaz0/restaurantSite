import { useRestaurant } from "../../Store/restaurant";
import MapBox from "../common/MapBox";
import PlateContainer from "../layout/PlateContainer";

const RestaurantPage = () => {
const {
  data: { latitude, longitude, restaurantName, coverPicture },
} = useRestaurant();
  return (
    <div className="flex w-full flex-col ">
      <div className=" flex flex-col md:flex-row justify-between ">
        <div className="relative md:w-1/2">
          <h1 className=" text-3xl text-light bg-gradient-to-b from-dark/30 w-full to-dark/90  absolute p-4  bottom-0">
            {restaurantName}
          </h1>
          <img
            src={coverPicture}
            className="aspect-5/3 rounded-lg object-cover"
          />
        </div>
        <article className="relative min-h-60 items-center flex flex-col md:w-1/2">
          <h1 className=" text-3xl text-light bg-gradient-to-b from-dark/30 w-full to-dark/90 z-502 absolute p-4  bottom-0">
            Restaurant Loaction
          </h1>
          <MapBox
            className={"w-full h-50 grow"}
            latitude={latitude}
            longitude={longitude}
          />
        </article>
      </div>
      <h1 className="text-4xl underline self-center p-2">Plates</h1>
      <div className="overflow-scroll">
        <PlateContainer />
      </div>
    </div>
  );
};

export default RestaurantPage;
 