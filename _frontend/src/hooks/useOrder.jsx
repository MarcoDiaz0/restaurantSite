import axios from "axios";
import { authSlice } from "../Store/user";
import { useAlert } from "../Store/Alert";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Store/modal";
import { useGetOrders } from "./useCustomer";
import { useGetOrders_R } from "./useRestaurant";
import { useState } from "react";

//! Create Order
export const useCreateOrder = () => {
  const {
    auth: { _id },
  } = authSlice();
  const { Alert } = useAlert();
  const navigate = useNavigate();
  const { setModal } = useModal();
  const [err, setErr] = useState("");

  //{ email, adress, restaurant, plates, customer }
  const createOrder = async (order) => {
    
    if (
      !order.phoneNumber ||
      !/^(?:\+213|0)(5|6|7)\d{8}$/.test(order.phoneNumber)
    ) {
      setErr(
        !order.phoneNumber
          ? "Please fill the input with your Phone Number"
          : /^(?:\+213|0)(5|6|7)\d{8}$/.test(order.phoneNumber)
          ? ""
          : "Please Enter Valid Phone Number"
      );
      return;
    }
    try {
      setErr("");      
      const res = await axios.post("/api/orders/create", {
        ...order,
        customer: _id || null,
      });
      if (res.data.success) {
        setModal();
        navigate("/orders");
        Alert("You Have Successfully Create An Order", true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { createOrder, err };
};
//! Delete Order
export const useDeleteOrder = () => {
  const { Alert } = useAlert();
  const { getOrders } = useGetOrders();
  const deleteOrder = async (_id) => {
    try {
      const res = await axios.delete(`/api/orders/delete/${_id}`);
      if (res.data.success) {
        Alert("You Have Successfully Delete The Order", true);
        getOrders();
      }
    } catch (error) {
      console.log(error);
      Alert("Bad Request", false);
    }
  };
  return { deleteOrder };
};
//! Confirm Order
export const useConfirmOrder = () => {
  const {
    auth: { _id },
  } = authSlice();
  const { getRestOrders } = useGetOrders_R();
  const { Alert } = useAlert();
  const confirmOrder = async (id, status) => {
    try {
      const res = await axios.put("/api/orders/confirm", {
        restaurant: _id,
        _id: id,
        status,
      });      
      getRestOrders();
      Alert(res.data.message, true);
    } catch (error) {
      console.log(error);
      Alert("Bad Request", false);
    }
  };
  return { confirmOrder };
};
