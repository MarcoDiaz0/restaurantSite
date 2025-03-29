/* eslint-disable react/prop-types */

function RotateButton({
  text,
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
      id={id}
      onClick={onClick}
      className={`cursor-pointer flex rounded-full p-2 hover:w-30  duration-800 ${className} 
        ${disabled && "opacity-50 cursor-not-allowed pointer-events-none"}
        `}
      disabled={disabled}
    >
      <div className="text-[0px] hover:text-[24px] ">{text}</div>
      <div className="hover:rotate-360">{children}</div>
    </button>
  );
}

export default RotateButton;
