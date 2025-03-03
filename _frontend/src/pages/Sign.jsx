import { useState } from "react";
import Signup from "../components/Auth/Signup";
import Button from "../components/common/Button";
import Login from "../components/Auth/Login";

export default function Sign() {
  const [isSignUp, setIssignUp] = useState(true);
  return (
    <div className="relative  overflow-x-hidden h-full">
      <div
        className={`absolute duration-500 -left-full top-0  ${
          isSignUp && "translate-x-full relative"
        } w-full h-full  `}
      >
        <Signup />
      </div>

      <div
        className={` absolute duration-500 -right-full top-0  ${
          !isSignUp && "-translate-x-full md:-translate-x-[50%] relative"
        }  w-full h-full  `}
      >
        <Login />
      </div>
      <div
        className={`duration-500 ${
          isSignUp && "md:left-0 md:translate-x-full"
        } w-full h-full  md:w-1/2 md:absolute md:top-0  `}
      >
        <div
          className={`bg-prime grow gap-5 text-center duration-500 flex flex-col h-full py-5 items-center justify-center ${
            isSignUp ? "rounded-tl-full" : "rounded-tr-full"
          }`}
        >
          <h1 className="text-4xl text-bold">
            {isSignUp ? "ALREADY A MEMBER?" : "NEW IN NEARBY FOOD?"}
          </h1>
          <p className="w-2/3 text-center">
            {isSignUp
              ? "Glad to see you again, Log in to your account!"
              : `Search for your favorite fastfood, plates, drinks and desserts in the nearest place to you`}
          </p>
          <Button
            className="bg-light p-3 rounded-2xl hover:scale-105"
            onClick={() => setIssignUp(!isSignUp)}
          >
            {isSignUp ? "LOGIN" : "SIGN UP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
