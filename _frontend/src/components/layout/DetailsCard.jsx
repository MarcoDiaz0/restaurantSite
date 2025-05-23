/* eslint-disable react/prop-types */
import { FaStar, FaTrash } from "react-icons/fa6";
import Button from "../common/Button";
import { authSlice } from "../../Store/user";
import { FaEdit } from "react-icons/fa";
import { useDeletePlate, useUpdatePlate } from "../../hooks/usePlate";
import Lottie from "lottie-react";
import Loader from "../../images/Loader.json";
import { useModal } from "../../Store/modal";
import { Link } from "react-router-dom";
import { useGetRestaurant } from "../../hooks/useRestaurant";
import { useState } from "react";
import { FileInput } from "../common/FileInput";

function DetailsCard({ plate }) {
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const [newPlate, setNewPlate] = useState({});
  const { updatePlate } = useUpdatePlate();
  const { getRestaurantData } = useGetRestaurant();
  const [editMode, setEditMode] = useState(false);
  const { setModal } = useModal();
  const { deletePlate, loading } = useDeletePlate();
  const DeleteHandler = () => {
    deletePlate(plate._id, _id);
    setModal(false);
  };
  const getRestaurant = () => {
    getRestaurantData(plate.restaurant._id);
    setModal();
  };
  const update = async () => {
    updatePlate(newPlate);
    setModal();
  };
  const editModeHandler = () => {
    setNewPlate({
      description: plate.description,
      price: plate.price,
      picture: plate.picture,
      restaurant: _id,
      _id: plate._id,
    });
    setEditMode(true);
  };
  if (plate)
    return (
      <div className="flex flex-col md:flex-row  text-light bg-dark/80 rounded-2xl ">
        {editMode ? (
          <>
            {typeof newPlate.picture == "string" ? (
              <FileInput
                type={"image/*"}
                title="Upload New Picture"
                className="duration-300 w-96 h-96 text-emerald-400  rounded-t-lg md:rounded-l-2xl  rounded-lg hover:bg-dark"
                onChange={(e) => {
                  setNewPlate({
                    ...newPlate,
                    picture: e.target.files[0],
                  });
                }}
              />
            ) : (
              <img
                src={URL.createObjectURL(newPlate.picture)}
                className=" w-full md:w-96 md:h-96  rounded-t-lg md:rounded-l-2xl "
              />
            )}
          </>
        ) : (
          <img
            src={plate.picture}
            className=" w-full md:w-96 md:h-96  rounded-t-lg md:rounded-l-2xl "
          />
        )}
        <div className="flex p-3 flex-col">
          <div className="grow flex flex-col">
            <h1 className="font-bold text-2xl">{plate.name}</h1>
            {editMode ? (
              <textarea
                onChange={(e) =>
                  setNewPlate({ ...newPlate, description: e.target.value })
                }
                value={newPlate.description}
                className="grow text-emerald-400 outline-0 border border-emerald-300 p-2 rounded-lg"
                placeholder="Write something"
              />
            ) : (
              <p className="grow overflow-y-scroll p-2 scroll-auto">
                {plate.description}
              </p>
            )}
            {!isOwner && (
              <Link
                onClick={getRestaurant}
                className="self-center hover:text-amber-300 duration-200"
                to={"/restaurantHome/page"}
              >
                {plate.restaurant.restaurantName}
              </Link>
            )}
          </div>
          <div>
            <div className="flex justify-between flex-wrap gap-1.5 my-2">
              <h1 className=" text-2xl mx-2">
                Price:{" "}
                {editMode ? (
                  <input
                    onChange={(e) =>
                      setNewPlate({ ...newPlate, price: e.target.value })
                    }
                    type="number"
                    className="Inconsolata font-medium w-20 mx-0.5 px-0.5 outline-0 text-emerald-400"
                    value={newPlate.price}
                  />
                ) : (
                  <span className="Inconsolata font-medium">{plate.price}</span>
                )}{" "}
                dz
              </h1>
              <h1 className=" text-2xl mx-2 flex gap-1 items-center ">
                Rate:{" "}
                <span className="Inconsolata font-medium">
                  {plate.rate.value}
                </span>{" "}
                <FaStar />
              </h1>
            </div>
            {isOwner ? (
              <div className="w-full flex gap-1">
                <Button
                  onClick={DeleteHandler}
                  className="bg-red-500/50 hover:bg-red-500 rounded-xl p-2  w-1/2"
                >
                  {loading ? (
                    <Lottie animationData={Loader} className="w-1/4" />
                  ) : (
                    <p className="flex items-center justify-center gap-2.5">
                      Delete <FaTrash />
                    </p>
                  )}
                </Button>
                {editMode ? (
                  <Button
                    onClick={update}
                    className="hover:bg-blue-500/50 bg-emerald-400 rounded-xl p-2 flex items-center justify-center gap-2.5 w-1/2"
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button
                    onClick={editModeHandler}
                    className="bg-blue-500/50 hover:bg-blue-500 rounded-xl p-2 flex items-center justify-center gap-2.5 w-1/2"
                  >
                    Edit <FaEdit />
                  </Button>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setModal(true, "order")}
                className="bg-prime hover:bg-dark border w-full rounded-lg p-1"
              >
                Buy Now
              </Button>
            )}
          </div>
        </div>
      </div>
    );
}

export default DetailsCard;
