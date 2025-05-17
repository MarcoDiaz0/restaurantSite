/* eslint-disable react/prop-types */

export const FileInput = ({ type, title, onChange, icon, className }) => {
  return (
    <div
      className={`cursor-pointer flex justify-center items-center  ${className}`}
    >
      <label
        htmlFor="file"
        className=" w-full  h-full flex justify-center items-center"
      >
        {icon}
        {title}
      </label>
      <input
        className="hidden"
        type="file"
        id="file"
        accept={type}
        onChange={onChange}
      />
    </div>
  );
};
