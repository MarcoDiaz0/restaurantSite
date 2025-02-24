import { useState } from "react";
import Input from "../common/Input.jsx";
import { IoIosMail, IoMdKey } from "react-icons/io";
import GoogleSign from "./GoogleSign";
import Button from "../common/Button.jsx";
import { useLogin } from "../../hooks/useAuth.jsx";
import Checkbox from "../common/Checkbox.jsx";
import { Link } from "react-router-dom";
const Login = () => {
  const [check, setcheck] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "marco@gmail.com",
    password: "marco1",
  });
  const { loading, login, err } = useLogin();
  const btnclass =
    " hover:bg-prime w-full  m-auto hover:text-light border border-grayText rounded-md text-grayText p-2";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(credentials);
      }}
      className="relative  w-full my-4 mx-1.5  py-3 md:w-1/2 grow p-2 rounded-lg flex flex-col gap-3"
    >
      <h1 className=" text-3xl self-center font-medium text-center">
        JOIN NEARBY<span className="text-prime">FOOD </span> NOW
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
      <div className="my-3 w-full  flex gap-1 justify-between tracking-wider font-bold">
        <Checkbox
          check={check}
          onCheck={setcheck}
          text="I am a Restaurant Owner "
          className="ml-2"
        />
        <Link className="hover:text-prime text-center duration-300">
          Forgot your password ?
        </Link>
      </div>
      <Button type="submit" className={btnclass}>
        {loading ? "..." : "LOGIN"}
      </Button>
    </form>
  );
};

export default Login;
