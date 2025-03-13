import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-20 bg-prime">
      <div className="container">
        <div className="grid grid-row-2 gap-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20"> 
            <div className="space-y-4 max-w-[400px]">
              <h1 className="text-2xl font-bold">About us</h1>
              <p><span className="font-bold">Nearby Food</span> is the perfect platform for those seeking a personalized dining experience. We provide advanced filters to help you find dishes that suit your specific dietary needs, including food allergies, intolerances, or medical conditions such as diabetes, hypertension, and heart disease. Whether you&apos;re following a gluten-free, vegan, or low-sodium diet, you can easily find restaurants that offer meals tailored to your preferences. Additionally, our platform allows you to discover the nearest restaurants, making your dining experience convenient and perfectly suited to your health requirements.</p>
            </div>
            <div className="grid grid-rows-2 gap-10">
            <div className="space-y-4">
              <div>
              <Link to="/contactUs" className="text-2xl text-bold hover:cursor-pointer hover:underline">
                Contact us
              </Link>
              </div>
              <p>Here you can find more information about us.</p>
            </div>
            <div className="space-y-4">
               <h1 className="text-2xl font-bold">Our community</h1>
               <div className="flex flex-col-3 space-x-6">
                 {[
                  {key:"facebook", link:"https://fr-fr.facebook.com/",icone:<FaFacebook className="hover:scale-120 duration-200 w-6 h-6" />},
                  {key:"instagram", link:"https://www.instagram.com/",icone:<FaInstagram className="hover:scale-120 duration-200 w-6 h-6" />},
                  {key:"linkedIn", link:"https://www.linkedin.com/",icone:<FaLinkedin className="hover:scale-120 duration-200 w-6 h-6" />},
                 ].map(({key,link,icone})=>
                 <a key={key} href={link} target="_blank" rel="noopener noreferrer">
                  {icone}
                  </a>
                 )}
               </div>
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm text-gray-900 sm:flex-row sm:gap-2 sm:pr-4" >
            <p className="text-sm border-0" >Copyright © 2025 NEARBY FOOD.</p>
            <span className="max-sm:hidden">·</span>
            <Link to="/policy" className="hover:underline hover:cursor-pointer ">Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer