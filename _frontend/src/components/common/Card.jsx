/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { FaRegHeart } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { FcLike } from "react-icons/fc";


const Card = ({ cardInfo, showHideM }) => {
  return (
    <div className="border  shadow shadow-dark rounded-2xl overflow-hidden  my-2 justify-self-center self-start">
     
        <img src={cardInfo.image} className="object-cover w-full aspect-square   " />
      
      <p className="text-lg mx-2 ">{cardInfo.title}</p>
      <div className="flex justify-between flex-wrap">
        <h1 className="font-bold mx-2">
          Price: <span className="font-medium">{cardInfo.price}</span> dz
        </h1>
        <h1 className="font-bold mx-2 flex gap-1 items-center ">
          Rate: <span className="font-medium">{cardInfo.rate}</span> <FaStar />
        </h1>
      </div>
      <div className="flex w-full  border-t">
        <Button className="w-1/2 h-10 border-r p-2">
          {cardInfo.isliked ? (
            <FcLike className={`m-auto static h-full w-full `} />
          ) : (
            <FaRegHeart className={`m-auto static h-full w-full `} />
          )}
        </Button>
        <Button
          onClick={() => showHideM({ cardId: cardInfo.id, show: true })}
          className="w-1/2 h-10 p-2"
        >
          <BiDetail className={`m-auto h-full w-full`} />
        </Button>
      </div>
    </div>
  );
};

export default Card;
