/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useOTPCheck } from "../../hooks/useAuth";
import { useModal } from "../../Store/modal";

const OTPModal = ({ length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
    const { setModal } = useModal();
  
  const [style, setStyle] = useState({
    width: "100%",
    backgroundColor: "green",
  });
  const { checkOTP } = useOTPCheck();

  useEffect(() => {
    let counter = 100;
    const interval = setInterval(() => {
      counter--;
      setStyle((state) => ({ ...state, width: counter + "%" }));
      if (counter === 60)
        setStyle((state) => ({ ...state, backgroundColor: "orange" }));
      if (counter === 20)
        setStyle((state) => ({ ...state, backgroundColor: "red" }));
      if (counter === 0) {
        setModal(false);
        return clearInterval(interval);
      }
    }, 600);
  }, [setModal]);
  const HandleChange = (e, i) => {
    if (isNaN(e.value) || !e.value) return;
    const newOtp = [...otp];
    newOtp[i] = e.value;
    setOtp(newOtp);
    if (i < length - 1 ) {
      e.nextSibling.focus();
    }
  };
  const hanndleBackSpace = (e, i) => {
    const newOtp = [...otp];
    newOtp[i] = "";
    setOtp(newOtp);
    if (i > 0 && !e.value) {
      e.previousSibling.focus();
    }
  };
  const HandleConfirmation = () => {
    const transOTP = [...otp].join("");
    checkOTP(transOTP);
    setModal(false)
  };
  return (
    <div className="text-center">
      <h1>Enter The Code That We Sent You Via Email</h1>
      {otp.map((value, i) => {
        return (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={value}
            className="w-14 h-14 m-1 text-center focus:border-prime outline-0 border-3 text-2xl border-dark/50 text-medium rounded-lg "
            onChange={(e) => HandleChange(e.target, i)}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                hanndleBackSpace(e.target, i);
              }
            }}
          />
        );
      })}
      <Button
        onClick={HandleConfirmation}
        className="block texr-center w-full p-2 bg-prime rounded-lg my-3"
      >
        Sign Up
      </Button>
      <div style={style} className="h-2 duration-1000 rounded-2xl"></div>
    </div>
  );
}

export default OTPModal;
