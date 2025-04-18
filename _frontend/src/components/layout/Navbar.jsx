import { Link, useLocation } from "react-router-dom";
import { authSlice } from "../../Store/user";
import { GoHomeFill } from "react-icons/go";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import LOGO from "../../images/LOGO.svg"

const Navbar = () => {
  const { pathname: location } = useLocation();
  const btnclass = " border-b-2 tracking-wider text-prime";
  const { auth } = authSlice();
  
  return (
    <div className="w-full p-4 gap-2 sticky z-2000 top-0 bg-light/60 backdrop-blur-xs flex flex-col justify-around sm:flex-row items-center">
      <div className="flex  items-center">
        <h1 style={{fontFamily: "Signika Negative"}} className="text-4xl flex items-center text-center mx-3 font-bold border-y-4 border-double border-prime ">
          <span className="text-prime">NEARBY</span>
          <img src={LOGO} className="h-12 mx-2 " />
          FOOD.
        </h1>
      </div>
      
      <div className="flex items-center">
        {[
          { route:  auth.isOwner ? "/restaurantHome":"/", title: "HOME", icon: <GoHomeFill /> },
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
      <Link to={!auth ? "sign" : "profile"}>
        <div className=" bg-white fixed right-2 top-6 pt-1 px-1 cursor-pointer hover:text-prime duration-200 rounded-full border-2">
          <FaUser className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
