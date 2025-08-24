import React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={`flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-white border-gray-300 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
        className || ""
      }`}
      {...props}
    />
  );
}

export { Input };
