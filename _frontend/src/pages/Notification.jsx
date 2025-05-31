/* eslint-disable react/prop-types */
import axios from "axios";
import Button from "../components/common/Button";
import { authSlice } from "../Store/user";

const Notification = ({ setRedDot, notification, setNotification }) => {
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const markAsRead = async () => {
    setRedDot(false);
    try {
      const res = await axios.get(
        `/api/${isOwner ? "restaurant" : "customer"}/setNotification/${_id}`
      );
      if (res.data.success)
        setNotification({
          orders: 0,
          customers: 0,
          customerOrders: 0,
        });
    } catch (error) {
      console.error("Notification error:", error);
    }
  };
  return (
    <div className="md:w-7/10 min-h-[70vh] flex flex-col mx-auto py-2 ">
      {isOwner ? (
        <div className="border p-5 rounded-lg relative flex flex-col h-32">
          <h1>
            - You Have{" "}
            <span className={"text-prime"}>{notification.orders} </span>New
            Orders To Check Them
          </h1>
          <h1>
            {" "}
            - <span className={"text-prime"}>
              {notification.customers}
            </span>{" "}
            Customers Rate Your Plate
          </h1>
          <Button
            onClick={markAsRead}
            className="absolute right-2 bottom-2 rounded border p-3 bg-dark/60 hover:bg-dark text-light "
          >
            Mark As Read
          </Button>
        </div>
      ) : (
        <div className="border p-5 relative flex h-32">
          - Your
          <span className={"text-prime mx-1"}>
            {" "}
            {notification.customerOrders}{" "}
          </span>
          Orders Has Been Checked By The Restaurant
          <Button
            onClick={markAsRead}
            className="absolute right-2 bottom-2 rounded border p-3 bg-dark/60 hover:bg-dark text-light "
          >
            Mark As Read
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notification;
