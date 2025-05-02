import { useState } from "react";
import Input from "../common/Input.jsx";
import { IoIosMail, IoMdKey } from "react-icons/io";
import GoogleSign from "./GoogleSign";
import Button from "../common/Button.jsx";
import { useLogin } from "../../hooks/useAuth.jsx";
import Checkbox from "../common/Checkbox.jsx";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../../images/Loader.json";
import { useModal } from "../../Store/modal.js";
import { authSlice } from "../../Store/user.js";

const Login = () => {
  const { isOwner, setOwner } = authSlice();
  const { setModal } = useModal();
  const [credentials, setCredentials] = useState({
    email: "marco@gmail.com",
    password: "marco1",
  });
  const { loading, login, err } = useLogin();
  const btnclass =
    " hover:bg-prime w-full flex justify-center   m-auto hover:text-light border border-grayText rounded-md text-grayText p-2";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(credentials);
      }}
      className=" w-full my-4 mx-1.5  py-3 md:w-1/2 grow p-2 rounded-lg flex flex-col gap-3"
    >
      <h1 className=" text-3xl self-center font-medium text-center">
        JOIN NEARBY<span className="text-prime">FOOOD </span> NOW
      </h1>
      <GoogleSign />
      <aside className="w-full flex justify-center items-center relative">
        <div className="absolute w-full h-px bg-gray-800"></div>
        <h2 className="px-4 tracking-widest  font-bold z-10 bg-light">OR</h2>
      </aside>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          err={err.email}
          onChange={(e) =>
            setCredentials((ls) => ({ ...ls, email: e.target.value }))
          }
          value={credentials.email}
          title={"Email"}
          icon={<IoIosMail />}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          err={err.password}
          onChange={(e) =>
            setCredentials((ls) => ({ ...ls, password: e.target.value }))
          }
          value={credentials.password}
          title={"Password"}
          type="password"
          icon={<IoMdKey />}
        />
      </div>
      <div className="my-2 w-full flex justify-between tracking-wider font-bold">
        <Checkbox
          check={isOwner}
          onCheck={setOwner}
          text="I am a Restaurant Owner "
        />
        <Link
          onClick={() => setModal(true, "login")}
          className="hover:text-prime grow text-right px-2 duration-300"
        >
          Forgot your password ?
        </Link>
      </div>
      <Button type="submit" className={btnclass}>
        {loading ? <Lottie animationData={Loader} className=" w-7" /> : "LOGIN"}
      </Button>
    </form>
  );
};

export default Login;
