import { useState } from "react";
import FilterBar from "../components/layout/FilterBar";
import PlateContainer from "../components/layout/PlateContainer";
import { FaFilter, FaTimes } from "react-icons/fa";

const Menu = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      <button
        className="fixed top-4 left-4 bg-prime p-2 rounded-full text-white z-50"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? <FaTimes className="w-6 h-6" /> : <FaFilter className="w-6 h-6" />}
      </button>

      {showFilters && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowFilters(false)}
        ></div>
      )}

      <div
        className={`fixed bottom-4 left-0 h-[calc(100vh-5rem)] w-1/2 bg-dark transform ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 overflow-y-auto`}
      >
        <FilterBar />
      </div>

      <div>
        <PlateContainer />
      </div>
    </div>
  );
};

export default Menu;
