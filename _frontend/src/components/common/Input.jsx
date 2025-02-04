import { useRef, useState } from "react";
import { focusing } from "../../Utils/utils";
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
  const [focus, setfocus] = useState(false);
  const [hide, sethide] = useState(false);

  return (
    <article
      className={`w-full duration-500 relative 
        ${focus && "text-tertiary"} ${className}
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
        className={`rounded-lg w-full relative overflow-hidden border-secondary duration-500 bg-gray-700 bg-opacity-10 border items-center px-3 flex 
          ${focus && "border-tertiary bg-tertiary !bg-opacity-5"}
          ${err && "!border-red-600 !bg-red-600 !bg-opacity-5"}
          
          `}
      >
        <div
          className={`text-[25px] ${focus && "text-tertiary"} 
          ${err && "!text-red-600"}
          `}
        >
          {icon}
        </div>

        <input
          {...focusing(setfocus)}
          type={type == "password" ? (hide ? "text" : "password") : type}
          className={`w-full h-full p-3 px-4 text-sm tracking-wider bg-transparent placeholder:tracking-widest placeholder:text-white/25 outline-none text-white ${classPrefix}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange ? onChange:(e) => {
            set((state) => ({ ...state, [name]: e.target.value }));
          }}
        />
        {type === "password" &&
          (!hide ? (
            <BsEyeFill
              onClick={() => {
                sethide(true);
              }}
              className={`text-gray-500 text-[24px] cursor-pointer hover:text-gray-400 duration-300 `}
            />
          ) : (
            <BsEyeSlashFill
              onClick={() => {
                sethide(false);
              }}
              className="text-gray-500 text-[24px] cursor-pointer hover:text-gray-400"
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
