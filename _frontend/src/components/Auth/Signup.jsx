import  { useState } from "react";
import Input from "../common/Input.jsx";
import { IoIosMail, IoMdKey } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import GoogleSign from "./GoogleSign";
import Button from "../common/Button.jsx";
import { useSignup } from "../../hooks/useAuth.jsx";
import Checkbox from "../common/Checkbox.jsx";
const Signup = () => {

  const [credentials, setCredentials] = useState({
    email: "marco@gmail.com",
    username: "marco",
    password: "marco1",
    confirmPassword: "marco1",
    isOwner: false
  });
  const { loading, signup, err } = useSignup()
  const btnclass =
    " hover:bg-prime w-full  m-auto hover:text-light border border-grayText rounded-md text-grayText p-2";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signup(credentials);
      }}
      className="relative my-4 mx-1.5 py-2 md:w-1/2 grow p-2 rounded-lg flex flex-col gap-3"
    >
      <h1 className=" text-3xl self-center font-medium text-center ">
        JOIN NEARBY<span className="text-prime">FOOD </span> NOW
      </h1>
      <GoogleSign />
      <aside className="w-full flex justify-center items-center relative">
        <div className="absolute w-full h-px bg-gray-800"></div>
        <h2 className="px-4 tracking-widest  font-bold z-10 bg-light">OR</h2>
      </aside>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          err={err.username}
          onChange={(e) =>
            setCredentials((ls) => ({ ...ls, username: e.target.value }))
          }
          value={credentials.username}
          title={"Username"}
          icon={<FaRegCircleUser />}
        />
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
        <Input
          err={err.confirmPassword}
          onChange={(e) =>
            setCredentials((ls) => ({
              ...ls,
              confirmPassword: e.target.value,
            }))
          }
          value={credentials.confirmPassword}
          title={"Confirm Password"}
          type="password"
          icon={<IoMdKey />}
        />
      </div>
      <div className="my-3 w-full flex gap-1 tracking-wider font-bold">
        <Checkbox
          check={credentials.isOwner}
          onCheck={() =>
            setCredentials((ls) => ({
              ...ls,
              isOwner: !ls.isOwner,
            }))
          }
          text="I am a Restaurant Owner "
          className="ml-2"
        />
      </div>
      {}
      <Button type="submit" className={btnclass}>
        {loading ? "..." : "SIGNUP"}
      </Button>
    </form>
  );
};

export default Signup;
