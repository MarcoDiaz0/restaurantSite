import React, { useEffect, useRef, useState } from "react";
import Portal from "../layouts/Portal";

const Modal = ({ children, className, open, onClose, closabel = true }) => {
  const ref = useRef();

  const [animate, setanimate] = useState(false);
  const [kill, setkill] = useState(true);

  const handleClick = () => {
    ref.current.classList.add("shake");

    setTimeout(() => {
      ref.current.classList.remove("shake");
    }, 1000);
  };

  useEffect(() => {
    if (open) {
      setkill(false);
      setTimeout(() => {
        setanimate(true);
      }, 100);
    } else {
      setanimate(false);
      setTimeout(() => {
        setkill(true);
      }, 200);
    }
  }, [open]);

  return (
    <Portal>
      {!kill && (
        <article
          onClick={() => (closabel ? handleClick() : onClose(false))}
          className={`fixed inset-0 flex justify-center items-center z-[999] transition-colors ${
            animate ? "visible bg-black/60" : "invisible"
          }`}
        >
          <aside
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className={` shadow  transition-all duration-500 ${className} ${
              animate ? "opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {children}
          </aside>
        </article>
      )}
    </Portal>
  );
};

export default Modal;
