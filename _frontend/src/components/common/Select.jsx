/* eslint-disable react/prop-types */

const Select = ({ id, title, options, className, value, onchange }) => {
  const optionStyle = "text-dark duration-300";
  return (
    <article
      className={`${className}  flex duration-200 focus:text-prime grow flex-col`}
    >
      <label className="my-2" htmlFor={id}>
        {title}
      </label>
      <select
        onChange={(e) => {
          onchange(e.target.value)
        }}
        value={value}
        className={`p-2 focus:border-prime outline-0 border-2 rounded-lg  `}
        id={id}
      >
        {options.map((option, index) => {
          return (
            <option className={optionStyle} key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </article>
  );
};

export default Select;
