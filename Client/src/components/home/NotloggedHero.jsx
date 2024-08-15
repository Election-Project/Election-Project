import React from "react";

const NotloggedHero = () => {
  return (
    <>
      <div className="px-28">
        <section className="relative bg-[url(https://img.freepik.com/premium-vector/jordan-national-independence-day-banner-country-celebration-flag-jordan_690954-776.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid)] bg-cover bg-center h-[35rem] w-full px-28 rou">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:flex lg:h-[30rem] lg:items-center lg:px-8">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                احصل على المعلومات
                <strong className="block font-extrabold text-[#0e7490]">
                  {" "}
                  عن الانتخابات{" "}
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                تعرف على المرشحين، المناطق الانتخابية، وكيفية التصويت لضمان
                مشاركتك الفعالة في الانتخابات القادمة.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="#"
                  className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  تعرف على المرشحين
                </a>

                <a
                  href="#"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  كيفية التصويت
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotloggedHero;
