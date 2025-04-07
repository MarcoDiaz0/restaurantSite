/* eslint-disable react/prop-types */

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
      className={`cursor-pointer overflow-hidden duration-300 active:translate-y-0.5  ${className} 
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "" }
        `}
      disabled={disabled}
    >
      {children}
      
    </button>
  );
}

export default Button;
