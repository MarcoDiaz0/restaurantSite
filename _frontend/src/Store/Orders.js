import { create } from "zustand";

export const useOrdersStore = create((set) => ({
  orders: [],
  setOrders: (orders) => {
    set({ orders });
  },
}));
