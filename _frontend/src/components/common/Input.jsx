/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function Input({
  icon,
  onChange,
  className,
  classPrefix = "",
  title,
  placeholder,
  type = "text",
  name,
  set,
  err,
  disabled = false,
  value,
}) {
  const [hide, sethide] = useState(false);

  return (
    <article
      className={`w-full duration-500 relative 
        ${className}
        ${err && "!text-red-600"}
        ${disabled && "opacity-60"}
        `}
    >
      {title && (
        <h1 className="font-semibold tracking-widest text-[15px] mb-1.5 ml-2">
          {title}
        </h1>
      )}
      <aside
        className={`rounded-lg w-full relative overflow-hidden border-secondary duration-500  bg-opacity-10 border items-center px-3 flex 
          ${err && "!border-red-600"}
          `}
      >
        <div className={`text-[25px] ${err && "!text-red-600"}`}>{icon}</div>
        <input
          type={type == "password" ? (hide ? "text" : "password") : type}
          className={`w-full h-full p-3 px-3  tracking-wider bg-transparent placeholder:tracking-widest placeholder:text-dark/25 outline-none text-dark ${classPrefix}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={
            onChange
              ? onChange
              : (e) => {
                  set((state) => ({ ...state, [name]: e.target.value }));
                }
          }
        />
        {type === "password" &&
          (!hide ? (
            <BsEyeFill
              onClick={() => {
                sethide(true);
              }}
              className={`text-dark text-[24px] cursor-pointer hover:text-prime duration-300 `}
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => {
                sethide(false);
              }}
              className="text-dark text-[24px] cursor-pointer hover:text-prime"
            />
          ))}
        {disabled && (
          <div className="w-full h-full absolute -translate-x-3 bg-white/15 cursor-not-allowed" />
        )}
      </aside>
      <h1
        className={`text-xs tracking-wider m-1 mt-2 duration-200 opacity-0 ${
          err ? "opacity-100 my-3" : "-my-2"
        }`}
      >
        {err}
      </h1>
    </article>
  );
}

export default Input;
