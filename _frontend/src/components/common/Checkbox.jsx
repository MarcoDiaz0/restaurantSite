import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Checkbox({
  onCheck,
  check,
  className,
  text,
  disabled = false,
}) {
  return (
    <article
      onClick={() => {
        !disabled && onCheck(!check);
      }}
      className={`flex gap-2 items-center cursor-pointer  font-bold tracking-wide text-[16px] ${disabled && "!cursor-not-allowed opacity-50"}`}
    >
      <div
        className={`w-5 h-5 border rounded-[5px] text-[12px] grid place-content-center  duration-300 ${className}
            ${check && "bg-tertiary border-tertiary"}
            ${disabled && "!bg-gray-600 border-gray-800"}
            `}
      >
        {" "}
        <FaCheck className={`duration-300 ${!check && "scale-0 opacity-0"}`} />
      </div>
      {text}
    </article>
  );
}
