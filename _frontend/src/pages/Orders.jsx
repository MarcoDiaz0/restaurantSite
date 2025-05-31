import OrderCard from "../components/common/OrderCard";
import { authSlice } from "../Store/user";
import Modal from "../components/common/Modal";
import RateModal from "../components/common/RateModal";
import { useModal } from "../Store/modal";
import { useOrdersStore } from "../Store/Orders";

const Orders = () => {
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const { modal } = useModal();
  const { orders } = useOrdersStore();  
  return (
    <div className="md:w-7/10 min-h-[70vh]  flex flex-col mx-auto p-2 ">
      {modal.display === "flex" && (
        <Modal>
          <RateModal plate={modal.user} />
        </Modal>
      )}
      {_id ? (
        <>
          {isOwner && orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <p className="text-3xl my-10 text-center">
              You Do not Have Any Orders Yet
            </p>
          )}
        </>
      ) : (
        <p className="text-3xl my-10 text-center">
          You Need To Log in To Track Your Orders
        </p>
      )}
    </div>
  );
};

export default Orders;
