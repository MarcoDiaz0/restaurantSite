import Select from "../components/common/Select";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDownloadDone } from "react-icons/md";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";
import { useFiltersStore } from "../Store/filters";
import { Swiper, SwiperSlide } from "swiper/react";
import Location from "../images/Location.svg";
import Search from "../images/Search.svg";
import Rating from "../images/Rating.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LandingPage = () => {
  const foodType = ["Plate", "Fastfood", "Drink", "Dessert"];
  const Categorie = ["diet", "sensitive", "disease"];
  const { filters, setFilter } = useFiltersStore();
  const SlideStyle = "m-auto block md:w-1/2 w-full h-full";
  const [buttonValue, setButtonValue] = useState(
    <FaLocationDot className="h-4 w-4 mx-2 flex" />
  );
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFilter("location", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setButtonValue(<MdOutlineDownloadDone className="h-6 w-6 mx-2 flex" />);
        console.log(filters);
      });
    }
  };
  return (
    <div>
      <div className={` backgroundImageMD text-light md:py-30  flex`}>
        <div className=" text-center bg-dark/80 md:min-w-1/2 px-2  rounded-3xl m-auto py-10">
          <h1 className="text-4xl">Find food and drinks online</h1>
          <div className="flex w-full md:w-3/5 flex-col md:flex-row gap-2 justify-self-center justify-around">
            <Select
              options={foodType}
              value={filters.foodType}
              onchange={(v) => {
                setFilter("foodType", v);
              }}
              title="Type of food "
            />
            <Select
              options={Categorie}
              value={filters.categorie}
              onchange={(v) => {
                setFilter("categorie", v);
              }}
              title="Categorie"
            />
          </div>
          <div className="flex flex-col w-full justify-self-center sm:w-3/5  ">
            <Button
              onClick={getLocation}
              className="border-prime flex justify-center items-center w-full border py-2 my-2 hover:bg-prime duration-500 rounded-lg "
            >
              {buttonValue} Use Your Location
            </Button>
            <Link to={"/menu"}>
              <Button className="border-prime w-full border py-2 my-2 hover:bg-prime duration-200 rounded-lg ">
                Get Start
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-96 my-10"
      >
        <SwiperSlide>
          <img src={Search} className={SlideStyle} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Location} className={SlideStyle} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Rating} className={SlideStyle} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LandingPage;
