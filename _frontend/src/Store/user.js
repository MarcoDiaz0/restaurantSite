import { create } from "zustand";

export const authSlice = create((set) => ({
  auth: {
    _id: localStorage.getItem("auth") || "",
    isOwner: localStorage.getItem("isOwner") == "true" ? true : false,
  },
  setAuth: (auth) => {
    if (!auth) {
      localStorage.removeItem("auth");
      localStorage.removeItem("isOwner");
      set({ auth: "" });
    } else {
      set(() => {
        localStorage.setItem("auth", auth._id);
        localStorage.setItem("isOwner", String(auth.isOwner));
        return { auth };
      });
    }
  },
  isOwner: localStorage.getItem("isOwner") == "true" ? true : false,
  setOwner: (value) => {
    if (!value) localStorage.removeItem("isOwner");
    else localStorage.setItem("isOwner", "true");

    set({ isOwner: value });
  },
}));
