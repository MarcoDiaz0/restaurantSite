import { create } from "zustand";

export const authSlice = create((set) => ({
  auth: localStorage.getItem("auth") || "",
  setAuth: (auth) =>
    set(() => {
      localStorage.setItem("auth", auth);
      return { auth };
    }),
  isOwner: false,
  setOwner: (value) => set(() => ({ isOwner: value })),
}));


