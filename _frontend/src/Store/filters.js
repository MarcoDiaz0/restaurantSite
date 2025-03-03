import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  filters: {
    location: {
      latitude: "",
      longitude: "",
    },
    foodType: "",
    categorie: "",
    HealthCondition: [],
  },
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));
  },
}));
