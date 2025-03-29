import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import LOGO from "../../images/LOGO.svg";

const Footer = () => {
  return (
    <div className="p-3 mt-1 grid md:grid-cols-4  gap-10 bg-prime ">
      <div className="col-span-2 ">
        <div>
          <h1
            style={{ fontFamily: "Signika Negative" }}
            className="text-2xl flex text-center font-bold "
          >
            NEARBY
            <img src={LOGO} className="h-8 mx-2 " />
            FOOD.
          </h1>
        </div>
        <p>
          <span className="font-bold">Nearby Food</span> is the ideal platform
          for personalized dining. We offer advanced filters to help you find
          dishes that match your dietary needs, including allergies,
          intolerances, or conditions like diabetes and heart disease. Whether
          you&apos;re gluten-free, vegan, or low-sodium, you can easily find
          suitable restaurants. Our platform also helps you discover nearby
          options, making dining convenient and health-focused.
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Company</h1>
        <ul className="flex flex-col gap-3 items-start">
          <a href="#">
            <li>Our Team</li>
          </a>
          <a href="#">
            <li>Reviews & feedBack</li>
          </a>
          <li>Contact Us :</li>

          <div className="flex flex-col-3 space-x-6">
            {[
              {
                key: "facebook",
                link: "https://fr-fr.facebook.com/",
                icone: (
                  <FaFacebook className="hover:scale-120 hover:text-light duration-200 w-6 h-6" />
                ),
              },
              {
                key: "instagram",
                link: "https://www.instagram.com/",
                icone: (
                  <FaInstagram className="hover:scale-120 hover:text-light duration-200 w-6 h-6" />
                ),
              },
              {
                key: "linkedIn",
                link: "https://www.linkedin.com/",
                icone: (
                  <FaLinkedin className="hover:scale-120 hover:text-light duration-200 w-6 h-6" />
                ),
              },
            ].map(({ key, link, icone }) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icone}
              </a>
            ))}
          </div>
        </ul>
      </div>
      <div className="flex flex-col gap-3 items-start">
        <li>Policy & Conditions</li>

        <p className="text-sm border-0">
          EMAIL: <br /> nearbyfoood@gmail.com
        </p>
        <p className="text-sm border-0">Copyright © 2025 NEARBY FOOD.</p>
      </div>
    </div>
  );
};

export default Footer;
