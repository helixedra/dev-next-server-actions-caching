import React, { useState } from "react";

type ToastProps = {
  status: string;
  message: string;
  duration?: number;
  position?: "top" | "bottom";
  onClose?: () => void;
};

const Toast: React.FC<ToastProps> = ({
  status,
  message,
  duration = 3000,
  position,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`${
        status === "success" ? "bg-green-600" : "bg-red-500"
      } fixed ${
        position === "top" ? "top-3" : "bottom-3"
      } left-1/2 transform -translate-x-1/2 text-white px-4 py-2 flex items-center justify-center text-sm text-center rounded-sm transition-transform duration-300 ease-in-out ${
        visible
          ? "translate-y-0"
          : position === "top"
          ? "-translate-y-full"
          : "translate-y-full"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
