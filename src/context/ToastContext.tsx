import React, { createContext, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showToast = (type: "success" | "error", message: string) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center",
      });
    } else {
      toast.error(message, {
        position: "top-center",
      });
    }
  };

  const value: ToastContextType = {
    success: (message) => showToast("success", message),
    error: (message) => showToast("error", message),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
