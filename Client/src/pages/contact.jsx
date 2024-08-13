import React from 'react';
import backgroundImage from '../assets/img/5.png'; // Import your image

const ContactForm = () => {
  return (
    <div
      className="min-h-screen py-6 flex flex-col justify-center sm:py-12"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A3C7C1] to-[#7B9F99] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-[#CDF0EA] bg-opacity-80 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">تواصل معنا</h1>
            <p className="text-[#556F6A]">الرجاء ادخال رسالتك هنا</p>
          </div>

          <form action="https://fabform.io/f/{form-id}" method="post">
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-[#556F6A] leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="الاسم"
              name="الاسم"
            />
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-[#556F6A] leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="البريد الإلكتروني"
              name="البريد الإلكتروني"
            />
            <input
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-[#556F6A] leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="العنوان"
              name="العنوان"
            />
            <textarea
              className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-[#556F6A] leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل النص هنا.."
              name="message"
              style={{ height: '121px' }}
            ></textarea>

            <div className="flex justify-between">
              <input
                className="shadow bg-[#0E7490] hover:bg-[#A3C7C1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="ارسل ➤"
              />
             
            </div>
            <a
              href="https://veilmail.io/e/FkKh7o"
              className="font-medium text-[#556F6A] dark:text-[#7B9F99] hover:underline"
            >
              Or click here to send for email address
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
