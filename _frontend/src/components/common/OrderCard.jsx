/* eslint-disable react/prop-types */

import { useConfirmOrder, useDeleteOrder } from "../../hooks/useOrder";
import { authSlice } from "../../Store/user";
import Button from "./Button";

const OrderCard = ({ order }) => {
  const { deleteOrder } = useDeleteOrder();
  const { confirmOrder } = useConfirmOrder();
  const {
    auth: { isOwner },
  } = authSlice();
  return (
    <div
      className={`bg-dark/70 my-2 rounded-lg p-2 text-light border-prime border-4 relative ${
        order.status === true && "!border-green-400"
      } ${order.status === false && "!border-red-400"}`}
    >
      <div className="flex gap-2 ">
        <div className="flex flex-col items-center gap-2">
          <img
            src={order.plate.picture}
            className=" w-full md:w-20 md:h-20  rounded-2xl "
          />
          {order.status !== null ? (
            <>
              {order.status === true ? (
                <p className={`py-2 w-full text-center bg-emerald-500 rouned`}>
                  Accepted
                </p>
              ) : (
                order.status === false && (
                  <p className={`py-2 w-full text-center bg-red-500`}>
                    Rejected
                  </p>
                )
              )}
            </>
          ) : (
            <p className={`py-2 w-full text-center bg-prime`}>Pending</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{order.plate.name}</h1>
          <h1>
            Price:{" "}
            <span className="Inconsolata font-medium">{order.price}</span> dz
          </h1>
          <h1>
            Phone Number:{" "}
            <span className="Inconsolata font-medium">{order.phoneNumber}</span>{" "}
          </h1>
          <p>ADRESS: {order.adress}</p>
        </div>
      </div>
      {isOwner ? (
        order.status === null && (
          <div className="absolute top-1.5 right-3 p-1.5 flex gap-2 ">
            <Button
              onClick={() => confirmOrder(order._id, true)}
              className=" bg-emerald-500/70 p-1.5 hover:bg-emerald-500 rounded"
            >
              Accept
            </Button>
            <Button
              onClick={() => confirmOrder(order._id, false)}
              className=" bg-red-500/70 p-1.5 hover:bg-red-500 rounded"
            >
              Reject
            </Button>
          </div>
        )
      ) : (
        <>
          {order.status === true && (
            <Button className="absolute top-1.5 right-3 bg-green-500/70 p-1.5 hover:bg-green-500 rounded">
              Rate
            </Button>
          )}
          <>
            {order.status === null && (
              <Button
                onClick={() => deleteOrder(order._id)}
                className="absolute top-1.5 right-3 bg-prime/70 p-1.5 hover:bg-red-500 rounded"
              >
                Cancel
              </Button>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default OrderCard;
