import React, { useEffect, useRef } from "react";

function Dropdown({
  component,
  children,
  direction,
  classPrefix = "",
  className,
  show,
  setopen,
}) {
  const ref = useRef();
  useEffect(() => {
    let handle = (e) => {
      if (!ref.current.contains(e.target)) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  return (
    <aside ref={ref} className={`relative z-40 ${classPrefix}`}>
      {React.cloneElement(component, {
        onClick: () => setopen(!show),
        onBlur: () => setopen(false),
      })}
      <div
        className={`absolute duration-500 
        ${Direction(direction.x, direction.y)} 
        ${className}
        ${show ? "opacity-100" : "!translate-y-2 pointer-events-none opacity-0"}
        
        `}
      >
        {children}
      </div>
    </aside>
  );
}

const Direction = (row = "center", col = "bottom") => {
  let x = "";
  if (row === "center") x = "left-1/2 -translate-x-1/2";
  if (row === "left") x = "left-0";
  if (row === "right") x = "right-0";
  let y = "";
  if (col === "bottom") y = "top-full translate-y-2.5";
  if (col === "top") y = "bottom-full -translate-y-2.5";
  return x + " " + y;
};

export default Dropdown;
