"use client";

import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Logo from "../assets/img/Logo.png";

export function Foot() {
  return (
    <Footer
      container
      className="bg-gradient-to-r from-black via-[#007a3d] to-[#ce1126] text-white shadow-md"
    >
      <div className="w-full text-center p-4">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Footer.Brand
            src={Logo}
            alt="انتخاباتي Logo"
            name="انتخاباتي"
            className="text-white text-2xl font-bold w-4xl h-20"
          />
          <Footer.LinkGroup className="flex flex-col sm:flex-row sm:space-x-6 mt-4 sm:mt-0">
            <Footer.Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              إعرف أكثر
            </Footer.Link>
            <Footer.Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              الدعم الفني
            </Footer.Link>
            <Footer.Link
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              تواصل معنا
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div className="my-4">
          <div className="w-1/2 mx-auto bg-white h-px" />
        </div>
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="انتخاباتي™"
            year={2024}
            className="text-white"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/IECjordan/?_rdc"
              icon={BsFacebook}
              className="text-white hover:text-gray-300 transition-colors duration-300 m-12"
            />
            <Footer.Icon
              href="https://www.instagram.com/iecjo/"
              icon={BsInstagram}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            />
            <Footer.Icon
              href="https://x.com/iecjo"
              icon={BsTwitter}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
