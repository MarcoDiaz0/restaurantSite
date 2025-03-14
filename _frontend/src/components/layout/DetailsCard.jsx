/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import Button from "../common/Button";

function DetailsCard({card}) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <img
        src={card.image}
        className="object-cover w-full md:w-96 aspect-square rounded-lg"
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
              Rate: <span className="font-medium">{card.rate}</span> <FaStar />
            </h1>
          </div>
          <Button className="bg-prime border w-full rounded-lg p-1">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard