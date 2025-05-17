import { useEffect } from "react";
import OrderCard from "../components/common/OrderCard";
import { useGetOrders } from "../hooks/useCustomer";
import { authSlice } from "../Store/user";
import { useGetOrders_R } from "../hooks/useRestaurant";
import Modal from "../components/common/Modal";
import RateModal from "../components/common/RateModal";
import { useModal } from "../Store/modal";

const Orders = () => {
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const { modal } = useModal();
  const { getOrders, orders = [] } = useGetOrders();
  const { getRestOrders, ResOrders = [] } = useGetOrders_R();
  useEffect(() => {
    if (_id && !isOwner) getOrders();
    if (_id && isOwner) getRestOrders();
  }, [_id, isOwner, orders, ResOrders]);
  return (
    <div className="md:w-7/10 min-h-[70vh] flex flex-col-reverse mx-auto py-2 ">
      {modal.display === "flex" && (
        <Modal>
          <RateModal plate={modal.user} />
        </Modal>
      )}
      {isOwner
        ? ResOrders.map((order) => <OrderCard key={order._id} order={order} />)
        : orders.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
};

export default Orders;
