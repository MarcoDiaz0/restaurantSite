import { useEffect, useState } from "react";
import cooking from "../images/cooking.svg";
import building from "../images/building.svg";
import Lottie from "lottie-react";
import Loader from "../images/Loader.json";
import { useModal } from "../Store/modal";
import Modal from "../components/common/Modal";
import { CreateRestaurant } from "../components/layout/CreateRestaurant";
import { useGetRestaurant } from "../hooks/useRestaurant";
import { authSlice } from "../Store/user";
import RestaurantPage from "../components/layout/RestaurantPage";

export const RestaurantHome = () => {
  const { getRestaurantData, loading, restaurantExist } = useGetRestaurant();
  const { setModal, modal } = useModal();
  const { auth } = authSlice();
  const  [insOpacity,setInsOpacity] = useState(0)

  useEffect(() => {
    if (auth.id) getRestaurantData(auth.id);
  }, []);
  if (restaurantExist)
    return (
      <div className="w-full relative flex justify-center items-center ">
        {loading ? (
          <div className="w-full h-full  absolute isolate z-40 duration-300 flex justify-center items-center">
            <Lottie animationData={Loader} className="w-1/4" />
          </div>
        ) : (
          <RestaurantPage auth="123" />
        )}
      </div>
    );
  else
    return (
      <div className="w-full min-h-[50vh] relative flex justify-center items-center ">
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
          <article className="text-center w-full">
            <h1 className="text-4xl my-3">
              You Need To Create Your Restaurant Page
            </h1>
            <div className="flex justify-around items-center">
              <img
                src={cooking}
                className={`w-69 ${
                  insOpacity && "translate-x-4"
                } hidden md:flex duration-1000 opacity-${insOpacity}`}
              />
              <button
                onMouseEnter={() => setInsOpacity(1)}
                onMouseLeave={() => setInsOpacity(0)}
                onClick={() => setModal(true, "restuarantHome")}
                className="w-20 m-4 h-20 duration-1000 border rounded hover:shadow-[-10px_-10px_0px_black,-15px_10px_0px_orange,15px_5px_0px_LightSalmon]"
              >
                Create
              </button>
              <img
                src={building}
                className={`w-69 ${
                  insOpacity && "-translate-x-4"
                } hidden md:flex duration-1000 opacity-${insOpacity}`}
              />
            </div>
          </article>
        )}
      </div>
    );
};
