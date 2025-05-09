import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { authSlice } from "../../Store/user";
import { FiUser } from "react-icons/fi";


const SideBar = () => {
    const {
      auth: { _id,isOwner },
    } = authSlice();
  return (
    <div
      className={` fixed z-2000 right-2 -translate-y-1/2 top-1/2 border-light border-2 text-light ${
        !_id ? "hidden" : "flex"
      } flex-col gap-3 p-3 bg-dark/50 rounded-full`}
    >
      <Link to={"profile"}>
        <div className="cursor-pointer hover:text-prime duration-200 ">
          <FiUser className="w-6 h-6" />
        </div>
      </Link>
      <Link>
        <div className="cursor-pointer hover:text-prime duration-200 ">
          <IoMdNotificationsOutline className="w-6 h-6" />
        </div>
      </Link>
      {!isOwner ? (
        <Link to={"/favourites"}>
          <div className="  cursor-pointer hover:text-prime duration-200 rounded-full">
            <IoMdHeartEmpty className="w-6 h-6" />
          </div>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default SideBar