import React, { useState } from "react";

function Radio({
  info,
  setinfo,
  name,
  text,
  className,
  classPrefix,
  disabled,
}) {
  return (
    <article
      onClick={() => {
        !disabled && setinfo((state) => ({ ...state, [name]: !state[name] }));
      }}
      className={`flex gap-3 items-center duration-300 cursor-pointer ${
        disabled ? "opacity-70 !cursor-not-allowed" : "group"
      }`}
    >
      <aside
        className={`relative rounded-full h-[22px] w-12 p-1  group-hover:bg-gray-500 bg-gray-600 duration-500 ${className}
        ${info[name] && "!bg-tertiary delay-200"}`}
      >
        <div
          className={`h-3.5 rounded-full duration-500 absolute w-3.5 left-1   ease-in-out bg-white ${classPrefix} 
            ${
              info[name]
                ? "!left-[calc(100%-4px)] -translate-x-full group-hover:-translate-x-[115%]"
                : "group-hover:translate-x-1 "
            }`}
        />
      </aside>
      <h1 className="text-white/60 text-sm">{text}</h1>
    </article>
  );
}

export default Radio;
