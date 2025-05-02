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
      className={`fixed p-4 rounded-3xl mx-6 left-1/2 -translate-x-1/2 -bottom-18 duration-500 
        ${success ? "bg-green-400" : "bg-red-400"}
        ${isActive && "-translate-y-21"} `}
    >
        <Button
          onClick={() => Alert()}
          className="absolute -top-1 -right-1 rounded-full bg-dark text-light  w-5 h-5"
        >
          <FaXmark className="w-full" />
        </Button>
      
      {message}
    </div>
  );
};
