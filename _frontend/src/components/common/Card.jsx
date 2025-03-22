/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import clsx from "clsx";

import Button from "./Button";
import Modal from "./Modal";
import { useModal } from "../../Store/modal";
import DetailsCard from "../layout/DetailsCard";

const Card = ({ cardInfo }) => {
  const [isActive, setIsActive] = useState(false);
  const { modal, setModal } = useModal();
  const cardRef = useRef();

  return (
    <div
      
      onClick={(e) => {
        if (cardRef.current === e.target) setModal(true, "card");
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="cursor-pointer shadow-lg relative shadow-dark/30 rounded-2xl overflow-hidden my-2 justify-self-center self-start"
    >
      {modal.display === "flex" && (
        <Modal>
          <DetailsCard card={cardInfo} />
        </Modal>
      )}
      <img
        ref={cardRef}
        src={cardInfo.image}
        className="object-cover w-full aspect-square relative"
        alt={cardInfo.title}
      />
      <div
        className={clsx(
          "bg-gradient-to-b from-dark/30 w-full to-dark/90 absolute text-light flex flex-col p-2 duration-200 bottom-0",
          { "lg:translate-y-[55%]": !isActive }
        )}
      >
        <p className="text-lg  whitespace-nowrap text-ellipsis overflow-hidden h-1/2 mx-2">
          {cardInfo.title}
        </p>
        <div className="h-1/2 justify-center gap-0 flex flex-col duration-800">
          <p className="mx-2">
            Price:{" "}
            <span className="Inconsolata font-medium">{cardInfo.price}</span> dz
          </p>
          <p className="mx-2 flex gap-1 items-center">
            Rate:{" "}
            <span className="Inconsolata font-medium">{cardInfo.rate}</span>{" "}
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
          <Button
            className="h-10 p-2"
            onClick={() => {}}
            aria-label={cardInfo.isliked ? "Unlike" : "Like"}
          >
            {cardInfo.isliked ? (
              <FcLike className="m-auto static h-full w-full" />
            ) : (
              <FaRegHeart className="m-auto static h-full w-full" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
