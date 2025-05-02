import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import LOGO from "../../images/LOGO light.svg";

const Footer = () => {
  return (
    <div className=" bg-dark text-light/80 ">
      <div className=" grid md:grid-cols-3  gap-10 p-7">
        <div>
          <h1
            style={{ fontFamily: "Signika Negative" }}
            className="text-2xl flex text-center font-bold "
          >
            NEARBY
            <img src={LOGO} className="h-8 mx-2 " />
            FOOOD.
          </h1>
          <li className="my-2">Policy & Conditions</li>
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase text-light">Company</h1>
          <ul className="flex flex-col gap-3 items-start">
            <a href="#">
              <li>Our Team</li>
            </a>
            <a href="#">
              <li>Reviews & feedBack</li>
            </a>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase text-light">Resources</h1>
          <ul className="flex flex-col gap-3 items-start">
            <a href="#">
              <li>Help & Support</li>
            </a>
            <a href="#">
              <li>What&apos;s New</li>
            </a>
          </ul>
        </div>
      </div>
      <div className="flex justify-between border-t p-5">
        <p className="text-sm border-0">Copyright © 2025 NEARBY FOOOD.</p>
        <div className="flex flex-col-3 space-x-6">
          {[
            {
              key: "facebook",
              link: "https://fr-fr.facebook.com/",
              icone: (
                <FaFacebook className="hover:scale-120 hover:text-prime duration-200 w-6 h-6" />
              ),
            },
            {
              key: "instagram",
              link: "https://www.instagram.com/",
              icone: (
                <FaInstagram className="hover:scale-120 hover:text-prime duration-200 w-6 h-6" />
              ),
            },
            {
              key: "linkedIn",
              link: "https://www.linkedin.com/",
              icone: (
                <FaLinkedin className="hover:scale-120 hover:text-prime duration-200 w-6 h-6" />
              ),
            },
          ].map(({ key, link, icone }) => (
            <a key={key} href={link} target="_blank" rel="noopener noreferrer">
              {icone}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
