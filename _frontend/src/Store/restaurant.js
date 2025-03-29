import { create } from "zustand";

export const RestaurantInfo = create((set) => ({
  data: {restaurantName: "",
    location: "",
    coverPicture: "",},
  setData: (data) => set({ data }),
  plates: [],
  setPlates: (value) => set({ plates: value }),
  addPlate: (value) => set((pls) => ({ plates: [...pls, value] })),
}));
