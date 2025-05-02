import { useEffect, useState } from "react";
import Input from "../common/Input.jsx";
import { IoIosMail, IoMdKey } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import GoogleSign from "./GoogleSign";
import Button from "../common/Button.jsx";
import { useSignup } from "../../hooks/useAuth.jsx";
import Checkbox from "../common/Checkbox.jsx";
import { useModal } from "../../Store/modal.js";
import Lottie from "lottie-react";
import Loader from "../../images/Loader.json";
import { authSlice } from "../../Store/user.js";

const Signup = () => {
  const { isOwner, setOwner } = authSlice();
  const [credentials, setCredentials] = useState({
    email: "marco@gmail.com",
    username: "marco",
    password: "marco1",
    confirmPassword: "marco1",
  });  
  const [minWait, setMinWait] = useState(false);
  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setMinWait(false);
    }, 60000);
    return () => {
      clearTimeout(timeout);
    };
  }, [minWait]);
  const { setModal} = useModal();
  const { loading, signup, err } = useSignup();
  const btnclass =
    " hover:bg-prime w-full flex justify-center  hover:text-light border p-2 rounded-md";
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signup(credentials);        
        if (res?.data?.success) {
          setMinWait(true);
          setModal(true, "signup");
        }
      }}
      className="  my-4 mx-1.5 md:w-1/2 px-2 rounded-lg flex flex-col gap-3"
    >
      <h1 className=" text-3xl self-center font-medium text-center ">
        JOIN NEARBY<span className="text-prime">FOOOD </span> NOW
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
          check={isOwner}
          onCheck={setOwner}
          text="I am a Restaurant Owner"
        />
      </div>
      {minWait && <p className="m-auto">Please wait for 1 min</p>}
      <Button type="submit" disabled={minWait} className={btnclass}>
        {loading ? (
          <Lottie animationData={Loader} className=" w-7" />
        ) : (
          "SIGN UP"
        )}
      </Button>
    </form>
  );
};

export default Signup;
