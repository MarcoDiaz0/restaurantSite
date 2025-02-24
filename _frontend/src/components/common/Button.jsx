import React from "react";
import { Ripple } from "react-ripple-click";

function Button({
  type = "button",
  id,
  className = "",
  onClick,
  style,
  children,
  disabled = false,
}) {
  return (
    <button
      style={style}
      type={type}
      id={id}
      onClick={onClick}
      className={`relative overflow-hidden duration-300  isolate active:translate-y-0.5  ${className} 
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
