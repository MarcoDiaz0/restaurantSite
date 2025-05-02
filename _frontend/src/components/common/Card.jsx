/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import clsx from "clsx";

import Button from "./Button";
import { useModal } from "../../Store/modal";
import { authSlice } from "../../Store/user";
import { useFavouritesStore } from "../../Store/favouraites";
import { useAddRemoveFav } from "../../hooks/useCustomer";

const Card = ({ cardInfo, setDetails }) => {
  const [isActive, setIsActive] = useState(false);
  const { favouritesPlates } = useFavouritesStore();  
  const { setModal } = useModal();
  const { AddRemoveFav } = useAddRemoveFav()
  const cardRef = useRef();
  const {
    auth: { _id,isOwner },
  } = authSlice();

  return (
    <div
      onClick={(e) => {
        if (cardRef.current === e.target) {
          setModal(true, "card");
          setDetails(cardInfo._id);
        }
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="cursor-pointer rounded shadow-lg w-full relative shadow-dark/30 overflow-hidden justify-self-center self-start"
    >
      <img
        ref={cardRef}
        src={cardInfo.picture}
        className="object-cover w-full aspect-square relative"
        alt={cardInfo.name}
      />
      <div
        className={clsx(
          "bg-gradient-to-b from-dark/30 w-full to-dark/90 absolute text-light flex flex-col p-2 duration-200 bottom-0",
          { "lg:translate-y-[55%]": !isActive }
        )}
      >
        <p className="text-lg  whitespace-nowrap text-ellipsis overflow-hidden h-1/2 mx-2">
          {cardInfo.name}
        </p>
        <div className="h-1/2 justify-center gap-0 flex flex-col duration-800">
          <p className="mx-2">
            Price:{" "}
            <span className="Inconsolata font-medium">{cardInfo.price}</span> dz
          </p>
          <p className="mx-2 flex gap-1 items-center">
            Rate:{" "}
            <span className="Inconsolata font-medium">
              {cardInfo.rate.value || 0}
            </span>{" "}
            <FaStar />
          </p>
        </div>
        <div
          className={clsx(
            "flex duration-300 absolute right-2 bottom-3 w-10 lg:-right-8",
            {
              "lg:-translate-x-10": isActive,
            }
          )}
        >
          {!isOwner && _id && (
            <Button className="h-10 p-2">
              {favouritesPlates?.find((plate) => plate._id == cardInfo._id) ? (
                <FcLike
                  onClick={() => AddRemoveFav("delete", cardInfo._id)}
                  className="m-auto static h-full w-full"
                />
              ) : (
                <FaRegHeart
                  onClick={() => AddRemoveFav("add", cardInfo._id)}
                  className="m-auto static h-full w-full"
                />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
