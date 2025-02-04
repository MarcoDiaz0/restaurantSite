import React, { useEffect, useRef, useState } from "react";
import Portal from "../layouts/Portal";

function Tooltip({
  children,
  text,
  className,
  classPrefix,
  space = 15,
  disabled = false,
  placement = "right",
  ref,
}) {
  const [show, setshow] = useState(false);
  
  
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();

  const MouseOver = (e) => {
    setshow(true);
    posRef.current = getPoint(
      e.currentTarget,
      tooltipRef.current,
      placement,
      space
    );
  };

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, {
            onMouseOver: MouseOver,
            onMouseOut: () => setshow(false),
          })}

      <Portal>
        <span
          key={Math.random}
          ref={tooltipRef}
          style={{
            top: `${posRef.current.y}px`,
            left: `${posRef.current.x}px`,
          }}
          className={`fixed pointer-events-none z-50`}
        >
          <div
            className={`bg-white relative duration-300  p-2 px-3.5 font-semibold whitespace-nowrap text-[15px] tracking-wide rounded-md z-50 ${className} 
            ${
              !show
                ? "opacity-0 scale-50"
                : "!translate-x-0 scale-100 !translate-y-0"
            }`}
          >
            {text}
            <div
              className={`w-3 h-3 absolute bg-white ${arrowDirecton(
                posRef.current.d
              )}`}
            />
          </div>
        </span>
      </Portal>
    </>
  );
}

const point = () => ({
  x: null,
  y: null,
  reset(p) {
    (this.x = p.x), (this.y = p.y);
  },
  restrictRect(rect) {
    if (this.x < rect.l) this.x = rect.l;
    else if (this.x > rect.r) this.x = rect.r;
    if (this.y < rect.t) this.y = rect.t;
    else if (this.y > rect.b) this.y = rect.b;
  },
});

const getPoint = (el, tt, placement, space) => {
  let recurCount = 0;
  let pt = point();
  const bdys = {
    l: space,
    t: space,
    r: document.body.clientWidth - (tt.clientWidth + space),
    b: window.innerHeight - (tt.clientHeight + space),
  };

  const elRect = el.getBoundingClientRect();

  return (function rucercive(placement) {
    //////!  POSITION  !//////
    recurCount++;
    const pos = position(placement);

    switch (pos.current) {
      case "left":
        pt.x = elRect.left - space - tt.offsetWidth;
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        pt.d = "left";
        break;
      case "right":
        pt.x = elRect.right + space;
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        pt.d = "right";
        break;
      case "top":
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.top - space - tt.offsetHeight;
        pt.d = "top";
        break;
      default:
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.bottom + space;
        pt.d = "bottom";
    }

    if (recurCount < 2)
      if (
        (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
        (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
      ) {
        pt.reset(rucercive(pos.negate()));
      }

    pt.restrictRect(bdys);
    return pt;
  })(placement);
};

const position = (p) => ({
  current: p,
  negate() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const arrowDirecton = (d) => {
  if (d === "right")
    return "top-1/2 -translate-y-1/2 -translate-x-1 rotate-45 left-0";
  if (d === "left")
    return "top-1/2 -translate-y-1/2 translate-x-1 rotate-45 right-0";
  if (d === "bottom")
    return "top-0 -translate-y-1 translate-x-1/2 rotate-45 right-1/2";
  if (d === "top")
    return "bottom-0 translate-y-1 translate-x-1/2 rotate-45 right-1/2";
};

export default Tooltip;
