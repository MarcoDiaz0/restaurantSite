/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { useRatePlates } from "../../hooks/useCustomer";
import { useModal } from "../../Store/modal";
import { authSlice } from "../../Store/user";

const RateModal = ({ plate }) => {
  const [stars, setStars] = useState([true, true, true, false, false]);
  const { ratePlate } = useRatePlates();
  const { setModal } = useModal();
  const handleRate = () => {
    const star = stars.filter(Boolean).length;
    ratePlate(star, plate);
    setModal();
  };
  const {
    auth: { _id },
  } = authSlice();
  if (_id)
    return (
      <div className="p-3 bg-light/80  rounded-2xl">
        <div className="flex gap-2">
          {stars.map((star, i) => {
            if (!star)
              return (
                <Button
                  key={i}
                  onClick={() => {
                    let newStars = [...stars];
                    for (let j in stars) {
                      if (j <= i) newStars[j] = true;
                    }
                    setStars(newStars);
                  }}
                >
                  <FaRegStar className="w-10 h-10" />
                </Button>
              );
            else
              return (
                <Button
                  key={i}
                  onClick={() => {
                    let newStars = [...stars];
                    for (let j in stars) {
                      if (j > i) newStars[j] = false;
                    }
                    setStars(newStars);
                  }}
                >
                  <FaStar className="w-10 h-10" />
                </Button>
              );
          })}
        </div>
        <Button
          onClick={handleRate}
          className="w-full mt-3 hover:bg-amber-300 hover:text-dark duration-500 bg-dark/80 text-light py-2 rounded-2xl"
        >
          Rate
        </Button>
      </div>
    );
  else return <div>You Need To Create An Account</div>;
};

export default RateModal;
