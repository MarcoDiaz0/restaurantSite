import { useEffect } from "react";

import Lottie from "lottie-react";
import Loader from "../images/Loader.json";
import { useModal } from "../Store/modal";
import Modal from "../components/common/Modal";
import { CreateRestaurant } from "../components/layout/CreateRestaurant";
import { useGetRestaurant } from "../hooks/useRestaursnt";
import { authSlice } from "../Store/user";
import MapBox from "../components/common/MapBox";

export const RestaurantHome = () => {
  const { getRestaurantData, loading, restaurantExist } = useGetRestaurant();
  const { setModal, modal } = useModal();
  const { auth } = authSlice();

  useEffect(() => {
    if (auth) getRestaurantData();
  }, []);
  if (restaurantExist)
    return (
      <div className="w-full h-[50vh] relative flex justify-center items-center ">
        {loading ? (
          <div className="w-full h-full  absolute isolate z-40 duration-300 flex justify-center items-center">
            <Lottie animationData={Loader} className="w-1/4" />
          </div>
        ) : (
          <div>
            <MapBox />
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="w-full h-[50vh] relative flex justify-center items-center ">
        {modal.display === "flex" && (
          <Modal>
            <CreateRestaurant />
          </Modal>
        )}
        {loading ? (
          <div className="w-full h-full  absolute isolate z-40 duration-300 flex justify-center items-center">
            <Lottie animationData={Loader} className="w-1/4" />
          </div>
        ) : (
          <article className="text-center">
            <h1 className="text-4xl">
              You Need To Create Your Restaurant Page
            </h1>
            <button
              onClick={() => setModal(true, "restuarantHome")}
              className="w-20 m-4 h-20 duration-500 border rounded hover:shadow-[-10px_-10px_0px_black,-15px_10px_0px_orange,15px_5px_0px_LightSalmon]"
            >
              Create
            </button>
          </article>
        )}
      </div>
    );
};
