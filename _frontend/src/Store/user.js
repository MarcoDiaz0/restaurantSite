import { create } from "zustand";

export const authSlice = create((set) => ({
  auth: localStorage.getItem("auth") || "",
  setAuth: (auth) => {
    if (!auth) {      
      localStorage.removeItem("auth");
      localStorage.removeItem("isowner");
      set({auth: ""});
    } else {
      set(() => {
        localStorage.setItem("auth", auth);
        return { auth };
      });
    }
  },
  isOwner: localStorage.getItem("isowner") ? true : false,
  setOwner: (value) => {
    if (!value) localStorage.removeItem("isowner");
    else localStorage.setItem("isowner", "...");

    set(() => {
      return { isOwner: value };
    });
  },
}));
