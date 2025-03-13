import { Link, useLocation } from "react-router-dom";
import { authSlice } from "../../Store/user";
import { GoHomeFill } from "react-icons/go";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { pathname: location } = useLocation();
  const btnclass = " border-b-2 tracking-wider text-prime";
  const { auth, isOwner } = authSlice();
  return (
    <div className="w-full p-4 gap-2 sticky z-20 top-0 bg-light/60 backdrop-blur-xs sm:flex-row flex flex-col items-center  sm:justify-between ">
      <div className="flex  items-center">
        <h1 className="text-2xl  text-center mx-3 font-bold border-y-4 border-double border-prime ">
          <span className="text-prime">NEARBY</span>FOOD.
        </h1>
      </div>
      <div className="flex items-center">
        {[
          { route: "/", title: "HOME", icon: <GoHomeFill /> },
          { route: "/menu", title: "MENU", icon: <MdRestaurantMenu /> },
        ].map(({ route, title, icon }) => (
          <Link
            key={title}
            to={route}
            className={`mx-2 hover:text-prime text-lg flex items-center gap-1 p-3 duration-100  ${
              location === route && btnclass
            }`}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>
      <Link to={!auth ? "sign" : isOwner ? "profileRes" : "profileCus"}>
        <div className=" bg-white fixed right-2 top-6 pt-1 px-1 cursor-pointer hover:text-prime duration-200 rounded-full border-2">
          <FaUser className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
