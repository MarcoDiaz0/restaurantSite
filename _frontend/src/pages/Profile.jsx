import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { authSlice } from "../Store/user";

const Profile = () => {
  const { setAuth } = authSlice();
  const handleLogOut = () => {
    setAuth(""); 
  };
  return (
    <div>
      <Link to={"/sign"} onClick={handleLogOut}>
        <Button className="bg-prime ">Log out</Button>
      </Link>
    </div>
  );
};

export default Profile;
