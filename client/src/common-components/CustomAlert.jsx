import React from "react";
import { Alert } from "@heroui/react";

export default function CustomAlert({
  color = "primary",
  title,
  description,
  ...props
}) {
  return (
    <Alert
      {...props}
      color={color}
      title={title}
      description={description}
      className={`rounded-lg shadow-md ${props.className || ""}`}
    />
  );
}
