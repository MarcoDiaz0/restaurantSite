/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useModal } from "../../Store/modal.js";
import Modal from "../common/Modal.jsx";
import CreateResModal from "../common/CreateResModal.jsx";
import cooking from "../../images/cooking.svg";
import building from "../../images/building.svg";
import { useGetRestaurant } from "../../hooks/useRestaurant.jsx";
import { authSlice } from "../../Store/user.js";
import { useNavigate } from "react-router-dom";

export const CreateRestaurant = () => {
  const { setModal, modal } = useModal();
  const navigate = useNavigate();
  const { getRestaurantData, exist } = useGetRestaurant();
  const {
    auth: { _id },
  } = authSlice();
  const [insOpacity, setInsOpacity] = useState(0);
  useEffect(() => {
    getRestaurantData(_id);
    if (exist) navigate("/restaurantHome/page");
  }, [exist]);
  return (
    <>
      {modal.display === "flex" && (
        <Modal>
          <CreateResModal />
        </Modal>
      )}
      <article className="text-center  w-full">
        <h1 className="text-4xl my-10">
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
    </>
  );
};
