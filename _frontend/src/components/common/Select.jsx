import React, { useEffect, useRef, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";

function Select({
  options,
  placeholder = "",
  onChange,
  empty = false,
  multiple = false,
  minLength = 1,
  placement = "down",
  addition,
  selected,
  set,
  name,
  className,
  classPrefix,
}) {
  const [open, setopen] = useState(false);

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

  const Change = (o, i) => {
    
    
    if (multiple) {
      set((state) => ({
        ...state,
        [name]: state[name]?.find((op) => op === o)
          ? state[name].filter((op) =>
              state[name].length > minLength ? op !== o : () => {}
            )
          : [...state[name], o],
      }));

      return;
    }
    set((state) => ({
      ...state,
      [name]: empty ? (state[name] === o ? "" : o) : o,
    }));
  };

  return (
    <article
      ref={ref}
      onClick={() => setopen(!open)}
      className={`bg-primary border  cursor-pointer px-4 text-sm pr-8 py-1 rounded-lg border-white/15 relative  ${className}`}
    >
      <div className="flex flex-nowrap items-center  overflow-hidden gap-1">
        {Array.isArray(selected)
          ? selected.map((item) => (
              <div className="p-1.5 py-0.5 rounded-md bg-gray-800 text-xs">
                {item}
              </div>
            ))
          : selected || <p className="text-white/60">{placeholder}</p>}
      </div>
      <BsCaretDownFill
        className={`absolute top-1/2 -translate-y-[45%] duration-300 right-1.5 
          ${
            placement === "down"
              ? `rotate-0 ${open && "rotate-180"} `
              : `rotate-180 ${open && "rotate-[360deg]"}`
          }
          
          `}
      />
      <aside onClick={()=>{}}
        className={`absolute bottom-0    left-1/2 transition-all rounded-lg opacity-0 pointer-events-none duration-300 -translate-x-1/2  bg-primary border-2 !z-40 border-white/15 max-h-52 overflow-y-auto  overflow-x-hidden 
        ${placement === "down" ? "translate-y-full" : ""}
        ${classPrefix}
          ${
            open
              ? placement === "down"
                ? "!translate-y-[calc(100%+10px)] opacity-100 pointer-events-auto"
                : `!-translate-y-10 opacity-100 pointer-events-auto`
              : "delay-100"
          } `}
      >
        {options.map((option, i) => (
          <div
            key={Math.random()}
            onClick={() => Change(option, i)}
            className={`w-full  text-[14px] flex flex-col relative group  py-2 px-2.5 whitespace-nowrap duration-300 hover:text-tertiary  border-white/15 
                ${option === selected && "text-tertiary"}
                ${
                  Array.isArray(selected) &&
                  selected.find((o) => o === option) &&
                  "text-tertiary"
                }
                
                ${i === options.length - 1 && "border-b-0"}
                `}
          >
            {option} {addition}
            <div className="left-0 top-1/2 -translate-y-1/2 absolute w-1 h-1/2 -translate-x-2 group-hover:-translate-x-0.5 duration-200 rounded-lg !z-50 bg-tertiary" />
          </div>
        ))}
      </aside>
    </article>
  );
}

export default Select;
