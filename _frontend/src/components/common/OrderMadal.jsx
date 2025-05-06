/* eslint-disable react/prop-types */
import Input from "./Input.jsx";
import Button from "./Button";
import { useState } from "react";
import { useCreateOrder } from "../../hooks/useOrder.jsx";

const OrderMadal = ({ plate }) => {
  const [credentials, setCredentials] = useState({phoneNumber:"",adress:""});
  const { createOrder } = useCreateOrder()
  const create = ()=> {
    createOrder({ ...credentials, plate: plate._id, restaurant:plate.restaurant });
  }
  
  return (
    <div className="flex flex-col gap-3 p-3 md:w-96 text-light bg-dark/80 rounded-2xl ">
      <div className="flex gap-2 items-center">
        <img
          src={plate.picture}
          className=" w-full md:w-20 md:h-20  rounded-2xl "
        />

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{plate.name}</h1>
          <h1>
            Price:{" "}
            <span className="Inconsolata font-medium">{plate.price}</span> dz
          </h1>
        </div>
      </div>
      <Input
        value={credentials.phoneNumber}
        onChange={(e) =>
          setCredentials((ls) => ({ ...ls, phoneNumber: e.target.value }))
        }
        type="number"
        placeholder={"Phone Number"}
        className={"bg-light rounded-lg"}
      />
      <textarea
        value={credentials.adress}
        onChange={(e) =>
          setCredentials((ls) => ({ ...ls, adress: e.target.value }))
        }
        placeholder="Adress"
        className={` py-3 px-6 border rounded-lg grow tracking-wider bg-light placeholder:tracking-widest placeholder:text-dark/50 outline-none text-dark`}
      />
      <Button
      onClick={create}
      className="bg-prime border w-full rounded-lg p-1">
        Confirm Order
      </Button>
    </div>
  );
};

export default OrderMadal;
