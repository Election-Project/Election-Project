
"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function Foot() {
  return (
    <Footer  container className="bg-[#CDF0EA]" >
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            // src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="انتخاباتي"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#" className="text-black">إعرف أكثر</Footer.Link>
            <Footer.Link href="#" className="text-black">الدعم الفني</Footer.Link>
            <Footer.Link href="#"className="text-black">تواصل معنا</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div className="my-4"> 
          <div className="w-1/2 mx-auto bg-white h-px" /> 
        </div>
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} className="text-black" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center gap-10">
            <Footer.Icon href="https://www.facebook.com/IECjordan/?_rdc" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/iecjo/" icon={BsInstagram} />
            <Footer.Icon href="https://x.com/iecjo" icon={BsTwitter} />
            
          </div>
        </div>
      </div>
    </Footer>
  );
}
