import React from "react";

export default function CustomInput({
  label,
  placeholder = "",
  value,
  onChange = () => {},
  type = "text",
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
