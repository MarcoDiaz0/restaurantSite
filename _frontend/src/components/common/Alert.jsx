import React, { useEffect, useRef, useState } from "react";

function Alert({ show, color, children, className }) {
  return (
    <article
      className={`font-extrabold tracking-wide text-center border  duration-500 rounded-lg  ${
        color === "red" &&
        "bg-red-500 bg-opacity-80 text-red-950 border-red-950  "
      }  ${className}
        ${
          show
            ? "scale-100 opacity-100 !my-2"
            : "scale-0 opacity-0  pointer-events-none "
        }
        `}
    >
      {children}
    </article>
  );
}

export default Alert;
