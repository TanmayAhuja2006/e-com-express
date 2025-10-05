// ...existing code...
import React from "react";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  // ToastDescription, // removed — package doesn't export this
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
        {description && (
          <div className="mt-1 text-sm text-current">{description}</div>
        )}
      </Toast>
    </ToastProvider>
  );
}
// ...existing code...
