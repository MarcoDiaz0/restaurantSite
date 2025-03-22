import Select from "../components/common/Select";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useFiltersStore } from "../Store/filters";
import { Swiper, SwiperSlide } from "swiper/react";
import Location from "../images/Location.svg";
import Search from "../images/Search.svg";
import Rating from "../images/Rating.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { LocationButton } from "../components/common/LocationButton";

const LandingPage = () => {
  const foodType = ["Plate", "Fastfood", "Drink", "Dessert"];
  const Categorie = ["diet", "sensitive", "disease"];
  const { filters, setFilter } = useFiltersStore();
  const SlideStyle = "m-auto block md:w-1/2 w-full h-full";

  return (
    <div>
      <div className={` backgroundImageMD text-light md:py-30 py-3 flex`}>
        <div className=" text-center backdrop-blur-xs bg-dark/80 md:min-w-1/2 px-2  rounded-3xl m-auto py-10">
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
            <LocationButton
              className="border-prime flex justify-center items-center w-full border py-2 my-2 hover:bg-prime duration-500 rounded-lg "
              setState={setFilter}
              title={"Use Your Location"}
            />
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
          <div>
            <img src={Search} className={SlideStyle} />
          </div>
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
