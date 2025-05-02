import { create } from "zustand";

export const useFavouritesStore = create((set) => ({
  favouritesPlates: [],
  setFavouritesPlates: (plates) => {
    set(() => ({ favouritesPlates: plates }));
  },
}));