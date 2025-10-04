import React from "react";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
} from "@heroui/react";

export default function CustomToast({
  isOpen = false,
  onClose = () => {},
  title = "",
  description = "",
  color = "primary", // success, warning, error, info, primary
  duration = 3000,
  className = "",
  ...props
}) {
  return (
    <ToastProvider>
      <Toast
        isOpen={isOpen}
        onOpenChange={onClose}
        duration={duration}
        {...props}
        className={className}
      >
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </Toast>
    </ToastProvider>
  );
}
