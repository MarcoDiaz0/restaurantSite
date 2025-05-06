import Button from "./Button";
import { FaXmark } from "react-icons/fa6";
import { useAlert } from "../../Store/Alert";

export const Alert = () => {
  const {
    AlertStatus: { isActive, success, message },
    Alert,    
  } = useAlert();  
  return (
    <div
      className={`fixed p-4 rounded-3xl left-1/2 -translate-x-1/2 z-9999 text-light -bottom-18 duration-500 
        ${success ? "bg-green-500/85 " : "bg-red-500/85 "}
        ${isActive && "-translate-y-21"} `}
    >
      <Button
        onClick={() => Alert()}
        className="absolute -top-1 -right-1 rounded-full border-light border bg-dark text-light  w-5 h-5"
      >
        <FaXmark className="w-full" />
      </Button>

      {message}
    </div>
  );
};
