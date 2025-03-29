import { create } from "zustand";

export const useAlert = create((set) => ({
  AlertStatus: { isActive: false, success: false, message: "" },
  Alert: (message, success = false) => {
    set({
      AlertStatus: { isActive: true, success: success, message: message },
    });
    setTimeout(() => {
      set({
        AlertStatus: { isActive: false, success: success, message: message },
      });
    }, 3000);
  },
}));
