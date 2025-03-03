import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { authSlice } from "../../Store/user";

const Navbar = () => {
  const { pathname: location } = useLocation();
  const btnclass = " border-b-2 tracking-wider text-prime";
  const { auth, isOwner } = authSlice();
  return (
    <div className="w-full p-4 gap-2 sticky top-0 bg-light sm:flex-row flex flex-col items-center  sm:justify-between ">
      <div className="flex  items-center">
        <h1 className="text-5xl  text-center mx-3 font-bold border-y-4 border-double border-prime ">
          <span className="text-prime">NEARBY</span>FOOD.
        </h1>
      </div>

      <div className="flex items-center">
        {[
          { route: "/", title: "HOME" },
          { route: "/menu", title: "MENU" },
          { route: "/aboutus", title: "ABOUTUS" },
        ].map(({ route, title }) => (
          <Link
            key={title}
            to={route}
            className={`mx-2 hover:text-prime p-3 duration-100  ${
              location === route && btnclass
            }`}
          >
            {title}
          </Link>
        ))}
      </div>
      <Link to={!auth ? "sign" : isOwner ? "profileRes" : "profileCus"}>
        <div className=" bg-white fixed right-2 top-6 py-1 px-2 cursor-pointer hover:text-prime duration-200 rounded-full border-2">
          <FaRegUserCircle className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
