/* eslint-disable react/prop-types */
import { useState } from "react";
import { useModal } from "../../Store/modal";
import Card from "../common/Card";
import Modal from "../common/Modal";
import DetailsCard from "./DetailsCard";
import OrderMadal from "../common/OrderMadal";

const PlateContainer = ({ plates = []}) => {
  const { modal } = useModal();
  const [details,setDetails] = useState("")
  const x =  plates.filter((plate) => plate._id == details)
  return (
    <>
      {modal.display === "flex" && (
        <Modal>
          {modal.user == "order"? <OrderMadal plate={x[0]} />:
          <DetailsCard plate={x[0]} />}
        </Modal>
      )}
      {plates.length != 0 ? (
        <div className="p-2 md:col-span-2  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 overflow-scroll gap-2">
          {plates?.map((plate) => (
            <Card key={plate._id} cardInfo={plate} setDetails={setDetails} />
          ))}
        </div>
      ) : (
        <p className="text-4xl text-center mt-10 w-full">There Are No Plates</p>
      )}
    </>
  );
};

export default PlateContainer;
