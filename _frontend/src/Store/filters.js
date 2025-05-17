import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  filters: {
    location: {
      latitude: null,
      longitude: null,
    },
    foodType: ["Plate", "Fastfood", "Drink", "Dessert"],
    category: {},
  },

  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));
  },
  filteredPlates: [],
  setFilteredPlates: (plates) => {
    set(() => ({ filteredPlates: [...plates] }));
  },
}));
