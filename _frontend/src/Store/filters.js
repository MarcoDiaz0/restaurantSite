import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  filters: {
    location: {
      latitude: null,
      longitude: null,
    },
    foodType: [],
    categorie: [],
  },
  buttonState: {
    icon: null,
    text: "Use Your Location",
  },
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));
  },
  setButtonState: (icon, text) => {
    set(() => ({
      buttonState: { icon, text },
    }));
  },
}));
