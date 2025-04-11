import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Location from "../images/Location.svg";
import Search from "../images/Search.svg";
import Rating from "../images/Rating.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { LocationButton } from "../components/common/LocationButton";
import Filters from "../components/common/Filters";

import { authSlice } from "../Store/user";
import { useEffect } from "react";

const LandingPage = () => {
  const SlideStyle = "m-auto md:w-1/2 w-full h-full";
  
  const { auth  } = authSlice();
      const navigate =useNavigate()
      useEffect(()=>{
        if(auth.id) navigate("/restaurantHome");
      },[])

  return (
    <div>
      <div className="flex backgroundImageMD absolute inset-0 min-h-screen w-full md:py-30 py-3"></div>
      <div className=" text-light">
        <div className="text-center backdrop-blur-xs bg-dark/80 md:min-w-1/2 px-2 rounded-3xl m-auto py-10">
          <h1 className="text-4xl mb-7">Find food and drinks online</h1>
         <div className="flex w-full md:w-3/5 flex-col md:flex-row gap-2 justify-self-center justify-around">
          <div className="flex flex-col justify-self-center w-full">
          <Filters />
            <LocationButton />
         
            <Link to="/menu">
              <Button className="border-prime text-light w-full border py-2 my-2 hover:bg-prime duration-200 rounded-lg">
                Get Start
              </Button>
            </Link>
          </div>
         </div>
        </div>
        </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
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