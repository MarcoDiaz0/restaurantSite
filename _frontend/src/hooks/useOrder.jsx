import axios from "axios"
import { authSlice } from "../Store/user"


//! Create Order 
export const useCreateOrder = () => {

    const createOrder =(order) => { //{ email, location, restaurant, plates, customer }
        const res = axios.post("/api/orders/create",order)
        return res.data
    }
    return {createOrder}
}
//! Delete Order 
export const useDeleteOrder = () => {

    const deleteOrder =(restaurant) => {
        const {
            auth: { _id },
          } = authSlice();
      const res = axios.delete("/api/orders/delete", { _id ,restaurant});
      return res.data;
    }
    return { deleteOrder };
}
//! Confirm Order 
export const useConfirmOrder = () => {

    const confirmOrder = ({restaurant,success}) => {
      const {
        auth: { _id },
      } = authSlice();
      const res = axios.put("/api/orders/confirm", {
        _id,
        restaurant,
        success,
      });
      return res.data; 
    };
    return { confirmOrder };
}