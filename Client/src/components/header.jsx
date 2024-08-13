
"use client";

import { Button, Navbar } from "flowbite-react";

export function Nav() {
  return (
    <Navbar fluid rounded className="bg-[#CDF0EA]">
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">انتخاباتي</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="">تسجيل خروج</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="ml-8 text-black" href="#" >
          الانتخابات
        </Navbar.Link>
       <Navbar.Link href="#" className="text-black">نتائج الانتخابات</Navbar.Link>
       
       <Navbar.Link href="#" className="text-black">إعرف أكثر</Navbar.Link>
        <Navbar.Link href="#" className="text-black">تواصل معنا</Navbar.Link>
        
        
      </Navbar.Collapse>
    </Navbar>
  );
}
