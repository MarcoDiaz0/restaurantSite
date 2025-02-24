import { FaGoogle } from "react-icons/fa";

function GoogleSign() {
  return (
    <article className="h-14 w-14 m-auto">
      <div className="p-3.5 flex rounded-full bg-[#D14E45]  items-center justify-center hover:scale-105 duration-500 text-[#fff] cursor-pointer relative overflow-hidden">
          <FaGoogle className="text-[28px] text-light" />
      </div>
    </article>
  );
}

export default GoogleSign;
