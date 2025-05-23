import { create } from "zustand";

export const useRestaurant = create((set) => ({
  data: { restaurantName: "",
    latitude:"",
    longitude:"",
    coverPicture: "" },
  setData: (data) => set({ data }),
  plates: [],
  setPlates: (value) => set({ plates: value }),
  addPlate: (value) => set((pls) => ({ plates: [...pls, value] })),
}));
