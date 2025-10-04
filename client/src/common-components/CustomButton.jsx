import React from "react";
import { Button } from "@heroui/react";

export default function CustomButton(props) {
  return (
    <Button
      {...props}
      onClick={() => {}}
      color={props.color || "primary"}
      onPress={props.onClick}
      className={`w-full md:w-auto px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold shadow-md transition hover:bg-indigo-50 ${
        props.className || ""
      } ${props.color === "primary" ? "bg-primary" : ""} ${
        props.isDisabled ? "bg-dark-grey" : ""
      }`}
    >
      {props.children}
    </Button>
  );
}
