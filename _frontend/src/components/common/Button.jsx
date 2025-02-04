import React, { useEffect, useRef } from "react";
import { Ripple } from "react-ripple-click";

function Button({
  type = "button",
  id,
  className = "",
  ripple,
  onClick,
  style,
  children,
  disabled,
}) {
  const btnRef = useRef();

  return (
    <button
      ref={btnRef}
      type={type}
      id={id}
      onClick={onClick}
      className={`relative overflow-hidden duration-500  isolate active:translate-y-0.5  ${className} 
        ${disabled && "opacity-50 cursor-not-allowed pointer-events-none"}
        `}
      disabled={disabled}
    >
      {children}
      <Ripple />
    </button>
  );
}

export default Button;
