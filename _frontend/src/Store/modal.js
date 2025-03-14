import { create } from "zustand";

export const useModal = create((set) => ({
  modal: {
    scale: "90%",
    opacity: "0",
    display: "none",
    user: "",
  },
  setModal: (bool, user) => {
    if (bool) {
      set((state) => ({
        modal: { ...state.modal, display: "flex", user: user },
      }));
      setTimeout(() => {
        set(() => ({
          modal: { display: "flex", scale: "100%", opacity: "1", user: user },
        }));
      }, 100);
    } else {
      set((state) => ({
        modal: { ...state.modal, scale: "90%", opacity: "0" },
      }));
      setTimeout(() => {
        set((state) => ({
          modal: { ...state.modal, display: "none", user: "" },
        }));
      }, 300);
    }
  },
}));
