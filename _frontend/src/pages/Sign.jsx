import { useState } from "react";
import Signup from "../components/Auth/Signup";
import Button from "../components/common/Button";
import Login from "../components/Auth/Login";
import LOGO from "../images/LOGO dark.svg";
import Modal from "../components/common/Modal";
import { useModal } from "../Store/modal";
import OTPModal from "../components/Auth/OTPModal";
import RecoverPassModal from "../components/Auth/RecoverPassModal";


export default function Sign() {
  const [isLogin, setIsLogin] = useState(true);
    const { modal} = useModal();
  
  return (
    <div className="relative   overflow-x-hidden h-full">
      {modal.display === "flex" && (
        <Modal>
          {modal.user == "signup" ? <OTPModal /> : <RecoverPassModal />}
        </Modal>
      )}

      <div
        className={`absolute duration-500 -left-full top-0  ${
          isLogin && "translate-x-full relative"
        } w-full h-full  `}
      >
        <Login />
      </div>

      <div
        className={` absolute duration-500 -right-full top-0  ${
          !isLogin && "-translate-x-full md:-translate-x-[50%] relative"
        }  w-full h-full  `}
      >
        <Signup />
      </div>
      <div
        className={`duration-500 ${
          isLogin && "md:left-0 md:translate-x-full"
        } w-full h-full  md:w-1/2 md:absolute md:top-0  `}
      >
        <div
          className={`bg-prime grow gap-5 text-center duration-500 flex flex-col h-full py-5 items-center justify-center ${
            isLogin ? "rounded-tl-full" : "rounded-tr-full"
          }`}
        >
          <img src={LOGO} className="w-36" />
          <h1 className="text-4xl text-bold">
            {!isLogin ? "ALREADY A MEMBER?" : "NEW IN NEARBY FOOOD?"}
          </h1>
          <p className="w-2/3 text-center">
            {!isLogin
              ? "Glad to see you again, Log in to your account!"
              : `Search for your favorite fastfood, plates, drinks and desserts in the nearest place to you`}
          </p>
          <Button
            className="bg-light p-2 rounded-2xl hover:scale-105"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "LOGIN" : "SIGN UP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
