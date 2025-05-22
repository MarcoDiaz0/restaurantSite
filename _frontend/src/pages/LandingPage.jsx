import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { LocationButton } from "../components/common/LocationButton";
import Filters from "../components/common/Filters";
import map from "../images/map.png";
import rate from "../images/Rate.png";
import Search_Filter from "../images/Search_Filter.png";
import { authSlice } from "../Store/user";
import { useEffect, useState } from "react";
import { useFilterPlates } from "../hooks/usePlate";
import { useFiltersStore } from "../Store/filters";

const LandingPage = () => {
  const {
    auth: { isOwner, _id },
  } = authSlice();
  const { filterPlates } = useFilterPlates()
    const {  setFilter } = useFiltersStore();
  
  const navigate = useNavigate();
  const [location ,setLocation] = useState({location: {latitude: null, longitude: null} })
   useEffect(() => {
     setFilter ("location", location.location);
   }, [location, setFilter]);
  useEffect(() => {
    if (isOwner) navigate("/restaurantHome/create");
  }, [isOwner, navigate]);
  const [text, setText] = useState({ display: false, index: 0 });
  const textArray = ["Diet Programs", "Sensitive People", "Patient Care"];
  useEffect(() => {
    setTimeout(() => {
      setText((ls) => ({ ...ls, display: !text.display }));
    }, 1500);
    if (!text.display)
      setText((ls) => ({ ...ls, index: (text.index % textArray.length) + 1 }));
  }, [text.display, textArray.length]);
  return (
    <div>
      <div className="bg-dark pb-8  text-light text-center">
        <h1 className="text-7xl">Nearby Foood </h1>
        <h1
          className={`md:text-7xl text-4xl  ${
            text.display ? "md:w-30 w-18 " : "w-full"
          } duration-1500 overflow-hidden p-3  text-nowrap m-auto`}
        >
          For{" "}
          <span className="text-prime">
            {textArray[text.index % textArray.length]}
          </span>
        </h1>
        <p className="md:w-1/2 w-9/10 mx-auto my-10">
          <span className="font-bold">Nearby Food</span> is the ideal platform
          for personalized dining. We offer advanced filters to help you find
          dishes that match your dietary needs, including allergies,
          intolerances, or conditions like diabetes and heart disease. Whether
          you&apos;re gluten-free, vegan, or low-sodium, you can easily find
          suitable restaurants. Our platform also helps you discover nearby
          options, making dining convenient and health-focused.
        </p>
        {!_id && <Link to="/sign">
          <Button className="bg-prime p-3 rounded-3xl hover:bg-light hover:text-dark duration-500 ">
            JOIN US
          </Button>
        </Link>}
      </div>

      <div className="flex text-light backgroundImageMD  w-full p-2  py-10">
        <div className="text-center backdrop-blur-xs bg-dark/80 md:min-w-2/3 px-2 rounded-3xl m-auto py-10">
          <h1 className="text-4xl mb-7">Find food and drinks online</h1>
          <div className="flex w-full md:w-3/5 flex-col md:flex-row gap-2 justify-self-center justify-around">
            <div className="flex flex-col justify-self-center w-full">
              <Filters />
              <LocationButton
                setlocation={setLocation}
                credentials={location}
                className={"border border-prime"}
              />
              <Link to="/menu" onClick={() => filterPlates()}>
                <Button className="border-prime text-light w-full border py-2 my-2 hover:bg-prime duration-200 rounded-lg">
                  Get Start
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-around">
        <div className="flex flex-col justify-center w-96 m-3 shadow-2xl rounded-2xl">
          <img src={map} className="rounded-t-2xl" />
          <div className="p-3">
            <h1 className="text-xl text-center font-bold">
              Restaurant location feature
            </h1>
            <p className="text-center">
              This Feature allows users to quickly and easily find the nearest
              restaurants in there area. Using the built-in GPS, the map
              displays the locations of different restaurants.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-96 m-3 shadow-2xl rounded-2xl">
          <img src={rate} className="rounded-t-2xl" />
          <div className="p-3">
            <h1 className="text-xl text-center font-bold">
              Food Rating Feature
            </h1>
            <p className="text-center">
              This Feature allows users to evaluate and share their dining
              experiences by assigning a score to individual dishes or overall
              meals, this intuitive visual scale helps convey quality at a
              glance
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-96 m-3 shadow-2xl rounded-2xl">
          <img src={Search_Filter} className="rounded-t-2xl" />
          <div className="p-3">
            <h1 className="text-xl text-center font-bold">
              Filter and Search Feature
            </h1>
            <p className="text-center">
              This feature helps users quickly find the meals or dishes
              they&apos;re craving by smart search capabilities with
              customizable filters, this feature streamlines discovery &
              improves user experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
