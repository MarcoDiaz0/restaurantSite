import React, { useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Button from "./Button";

function Pagination({ page, set, total }) {
  console.log({ page });

  const add = () => set((state) => ({ ...state, page: state.page + 1 }));
  const reduce = () => set((state) => ({ ...state, page: state.page - 1 }));

  useEffect(() => {
    set((state) => ({ ...state, page: 1 }));
  }, [total]);
  return (
    <section className="w-full flex justify-center py-2 ">
      <aside className="flex gap-1.5 items-end">
        <MdChevronLeft
          onClick={reduce}
          className={`text-white/80 hover:scale-110 duration-200 text-3xl cursor-pointer ${
            page === 1 && "pointer-events-none text-white/15"
          }`}
        />

        {total ? (
          <Button
            onClick={reduce}
            className={`text-xs w-6 h-6 pl-px bg-blue-500 rounded-full opacity-30   grid place-content-center ${
              page === 1 && "hidden"
            }`}
          >
            {page - 1}
          </Button>
        ) : (
          <></>
        )}

        <Button className="w-10 h-10 grid place-content-center cursor-pointer bg-tertiary rounded-full">
          {total ? page : <div className="loader w-5 h-5" />}
        </Button>
        {total ? (
          <Button
            onClick={add}
            className={`text-xs w-6 h-6 pl-px bg-blue-500 hover:opacity-50 rounded-full opacity-30   grid place-content-center ${
              page === total && "hidden"
            }`}
          >
            {page + 1}
          </Button>
        ) : (
          <></>
        )}
        <MdChevronRight
          onClick={add}
          className={`text-white/70 hover:scale-110 duration-200 text-3xl cursor-pointer ${
            page === total && "pointer-events-none text-white/15"
          }`}
        />
      </aside>
    </section>
  );
}

export default Pagination;
