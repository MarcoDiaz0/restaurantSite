import { Link, useLocation } from "react-router-dom";
import { authSlice } from "../../Store/user";
import { GoHomeFill } from "react-icons/go";
import { MdRestaurantMenu, MdShoppingCart } from "react-icons/md";

import LOGO from "../../images/LOGO light.svg";

const Navbar = () => {
  const { pathname: location } = useLocation();
  const btnclass = " border-b-2 tracking-wider text-prime";
  const {
    auth: { isOwner },
  } = authSlice();

  return (
    <div className="w-full p-4 gap-2 sticky z-2000 top-0 bg-dark text-light backdrop-blur-xs flex flex-col justify-around sm:flex-row items-center">
      <Link to={"/"}>
        <div className="flex items-center gap-0">
          <img src={LOGO} className="h-12 w-12 mx-2 " />
          <h1
            style={{ fontFamily: "Signika Negative" }}
            className="text-2xl flex flex-col  text-center font-bold "
          >
            <span className="text-prime">NEARBY</span>
            <p>FOOOD.</p>
          </h1>
        </div>
      </Link>

      <div className="flex items-center">
        {[
          {
            route: isOwner ? "/restaurantHome/create" : "/",
            title: "HOME",
            icon: <GoHomeFill />,
          },
          { route: "/menu", title: "MENU", icon: <MdRestaurantMenu /> },
          { route: "/orders", title: "ORDERS", icon: <MdShoppingCart /> },
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
    </div>
  );
};

export default Navbar;
