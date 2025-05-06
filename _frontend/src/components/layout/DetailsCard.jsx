/* eslint-disable react/prop-types */
import { FaStar, FaTrash } from "react-icons/fa6";
import Button from "../common/Button";
import { authSlice } from "../../Store/user";
import { FaEdit } from "react-icons/fa";
import { useDeletePlate } from "../../hooks/usePlate";
import Lottie from "lottie-react";
import Loader from "../../images/Loader.json";
import { useModal } from "../../Store/modal";

function DetailsCard({ plate }) {
  
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const { setModal } = useModal();
  const { deletePlate, loading } = useDeletePlate();
  const DeleteHandler = () => {
    deletePlate(plate._id, _id);
    setModal(false);
  };
  return (
    <div className="flex flex-col md:flex-row  text-light bg-dark/80 rounded-2xl ">
      <img
        src={plate.picture}
        className=" w-full md:w-96 md:h-96  rounded-t-lg md:rounded-l-2xl "
      />
      <div className="flex p-3 flex-col">
        <div className="grow flex flex-col">
          <h1 className="font-bold text-2xl">{plate.name}</h1>
          <p className="grow overflow-y-scroll scroll-auto">
            {plate.description}
          </p>
          {!isOwner && <a className="self-center">restaurant name</a>}
        </div>
        <div>
          <div className="flex justify-between flex-wrap gap-1.5 my-1">
            <h1 className=" text-2xl mx-2">
              Price:{" "}
              <span className="Inconsolata font-medium">{plate.price}</span> dz
            </h1>
            <h1 className=" text-2xl mx-2 flex gap-1 items-center ">
              Rate:{" "}
              <span className="Inconsolata font-medium">
                {plate.rate?.value || 0}
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
              <Button className="bg-blue-500/50 hover:bg-blue-500 rounded-xl p-2 flex items-center justify-center gap-2.5 w-1/2">
                Edit <FaEdit />
              </Button>
            </div>
          ) : (
            <Button onClick={()=>setModal(true,"order")} className="bg-prime border w-full rounded-lg p-1">
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
