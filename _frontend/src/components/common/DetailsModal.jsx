import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

/* eslint-disable react/prop-types */
function DetailsModal({ showHideM, card }) {
  const modalRef = useRef()
  const [animation, setAnimation] = useState({ scale: "90%", opacity: "0" });
  useEffect(() => {
    setAnimation({ scale: "100%", opacity: "1" });
  }, []);
  const hideModal = () => {
            setAnimation({ scale: "90%", opacity: "0" });
            setTimeout(() => {
              showHideM((ls) => ({ ...ls, show: false }));
            }, 300);
          }
  return (
    <div
      ref={modalRef} 
      onClick={(e)=>{
        if(modalRef.current === e.target) hideModal()
      }}
      className="w-screen h-screen top-0 left-0 fixed bg-dark/30 duration-300 flex justify-center items-center"
    >
      <div
        style={animation}
        className="bg-light mx-10 relative duration-300  flex flex-col md:flex-row gap-2 p-3 border rounded-2xl lg:w-3/5"
      >
        <Button
          onClick={hideModal}
          className="absolute border-2 border-prime -top-3 -right-3 rounded-full bg-dark text-light  w-7 h-7"
        >
          <FaXmark className="w-full" />
        </Button>
        <img
          src={card.image}
          className="object-cover w-full md:w-96 aspect-square   "
        />
        <div className="flex flex-col">
          <div className="grow flex flex-col">
            <h1 className="font-bold text-2xl">{card.title}</h1>
            <p className="grow overflow-y-scroll scroll-auto">
              {card.description}
            </p>
            <a href="">restaurant name</a>
          </div>
          <div>
            <div className="flex justify-between flex-wrap">
              <h1 className="font-bold text-2xl mx-2">
                Price: <span className="font-medium">{card.price}</span> dz
              </h1>
              <h1 className="font-bold text-2xl mx-2 flex gap-1 items-center ">
                Rate: <span className="font-medium">{card.rate}</span>{" "}
                <FaStar />
              </h1>
            </div>
            <Button className="bg-prime border w-full rounded-lg p-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
