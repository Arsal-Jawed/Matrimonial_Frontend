import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHeart, FaUsers, FaStar, FaSmile } from "react-icons/fa";

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-light-gray text-clr1 py-16 px-8 relative overflow-hidden">
      <div className="absolute w-36 h-36 bg-clr1 rounded-full opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 text-clr3 opacity-20 animate-spin">
        <FaSmile className="text-[12rem]" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div
          className="lg:w-1/2"
          data-aos="zoom-in"
        >
          <img
            src="./Assets/about.jpg"
            alt="Happy Couple"
            className="rounded-xl shadow-xl border-4 border-clr4 w-full"
          />
        </div>
        <div
          className="lg:w-1/2 flex flex-col justify-center items-start space-y-6"
          data-aos="fade-up"
        >
          <h2 className="text-5xl font-extrabold text-clr2">
            About <span className="text-clr3">Us</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="text-clr2 font-bold">Matrimonial AI</span>, the
            place where love meets destiny. We help you connect with your
            soulmate through a seamless and secure platform. Discover true
            companionship with profiles curated just for you!
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div
              className="flex flex-col items-center space-y-2"
              data-aos="flip-left"
            >
              <FaHeart className="text-clr1 text-4xl animate-bounce" />
              <h4 className="text-lg font-semibold text-clr1">Love</h4>
            </div>
            <div
              className="flex flex-col items-center space-y-2"
              data-aos="flip-up"
            >
              <FaUsers className="text-clr3 text-4xl animate-bounce" />
              <h4 className="text-lg font-semibold text-clr3">Community</h4>
            </div>
            <div
              className="flex flex-col items-center space-y-2"
              data-aos="flip-right"
            >
              <FaStar className="text-clr4 text-4xl animate-bounce" />
              <h4 className="text-lg font-semibold text-clr4">Trust</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
