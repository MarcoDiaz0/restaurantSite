/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useModal } from "../../Store/modal";
// import Button from "./Button";
// import { FaXmark } from "react-icons/fa6";

const Modal = ({ children }) => {
  const modalRef = useRef();
  const { modal, setModal } = useModal();

  return (
    <div
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) setModal();
      }}
      className="bottom-0 right-0 top-0 left-0 isolate overflow-scroll fixed z-3330 bg-dark/30 duration-300 flex justify-center items-center"
    >
      <div
        style={modal}
        className="m-10 max-w-9/10 relative duration-300 border rounded-2xl"
      >
        {/* <Button
          onClick={() => setModal(false)}
          className="absolute border-2 border-prime -top-3 -right-3 rounded-full bg-dark text-light  w-7 h-7"
        >
          <FaXmark className="w-full" />
        </Button> */}
        {children}
      </div>
    </div>
  );
};
export default Modal;
