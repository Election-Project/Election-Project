import React, { useState, useEffect } from "react";
import voter1 from "../assets/img/voter1.png";
import voter2 from "../assets/img/voter2.png";
import voter3 from "../assets/img/voter3.png";
import voter4 from "../assets/img/voter4.png";

const Section = ({ title, children, id }) => (
  <section id={id} className="mb-12 scroll-mt-20 relative">
    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-700 to-green-900"></div>
    <h2 className="text-2xl font-bold mb-6 text-green-900 border-b-2 border-red-700 pb-2 inline-block mr-4">
      {title}
    </h2>
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      {children}
    </div>
  </section>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        aria-expanded={isOpen}
        className="w-full text-right py-4 px-6 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-sm text-green-900">{question}</span>
        <span
          className={`text-red-700 text-sm transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="p-6 text-xs leading-relaxed text-gray-700 bg-white">
          {answer}
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-lg shadow-sm flex items-center space-x-3 transition-all duration-300 hover:shadow-md hover:scale-105 hover:rotate-1">
    <span className="text-red-700 text-3xl">{icon}</span>
    <div>
      <h3 className="text-xs font-semibold text-green-900 mb-1">{title}</h3>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const About = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "overview", label: "نظرة عامة" },
    { id: "statistics", label: "إحصائيات" },
    { id: "system", label: "النظام" },
    { id: "districts", label: "الدوائر" },
    { id: "process", label: "المراحل" },
    { id: "faq", label: "أسئلة شائعة" },
    { id: "participation", label: "المشاركة" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 text-gray-800">
      <header className="bg-gradient-to-r from-red-900 to-green-800 text-white py-6 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-1 rtl:space-x-reverse overflow-x-auto">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-xs font-semibold py-2 px-3 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "bg-white text-green-900 shadow-md"
                    : "text-white hover:bg-green-800"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-28 pb-12">
        <Section title="نظرة عامة" id="overview">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                تعتبر الانتخابات في الأردن عملية ديمقراطية حيوية تساهم في تحديد
                ممثلي الشعب في مختلف المجالات. يهدف النظام الانتخابي إلى تعزيز
                المشاركة الشعبية وضمان تمثيل متوازن للأفراد والمجتمعات في عملية
                اتخاذ القرار.
              </p>
            </div>
            <div className="md:w-1/2 h-48 relative overflow-hidden rounded-lg shadow-md">
              <img
                src={voter1}
                alt="نظرة عامة على الانتخابات في الأردن"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Section>

        <Section title="إحصائيات الانتخابات" id="statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon="📅" title="تاريخ آخر انتخابات" value="2020" />
            <StatCard
              icon="👥"
              title="عدد الناخبين المسجلين"
              value="4.64 مليون"
            />
            <StatCard icon="🗳️" title="نسبة المشاركة" value="29.9%" />
            <StatCard icon="🏛️" title="عدد المقاعد البرلمانية" value="130" />
          </div>
        </Section>

        <Section title="النظام الانتخابي" id="system">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                يعتمد الأردن نظام القائمة النسبية المفتوحة في انتخاباته
                البرلمانية. يتيح هذا النظام للناخبين اختيار قائمة حزبية والتصويت
                لمرشحين محددين ضمن تلك القائمة.
              </p>
            </div>
            <div className="md:w-1/2 h-48 relative overflow-hidden rounded-lg shadow-md">
              <img
                src={voter3}
                alt="النظام الانتخابي الأردني"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Section>

        <Section title="الدوائر الانتخابية" id="districts">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                ينقسم الأردن إلى 23 دائرة انتخابية، موزعة على 12 محافظة. تختلف
                كل دائرة في عدد المقاعد المخصصة لها بناءً على الكثافة السكانية
                والتمثيل الجغرافي.
              </p>
            </div>
            <div className="md:w-1/2 h-48 relative overflow-hidden rounded-lg shadow-md">
              <img
                src={voter2}
                alt="الدوائر الانتخابية في الأردن"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Section>

        <Section title="مراحل العملية الانتخابية" id="process">
          <ol className="space-y-3 text-sm">
            {[
              "تسجيل الناخبين وتحديث سجلات الناخبين",
              "إعلان موعد الانتخابات وفتح باب الترشح",
              "فترة الحملات الانتخابية",
              "يوم الاقتراع",
              "فرز الأصوات وإعلان النتائج",
            ].map((step, index) => (
              <li
                key={index}
                className="bg-gradient-to-r from-white to-green-50 p-4 rounded-lg shadow-sm flex items-center transition-all duration-300 hover:shadow-md hover:translate-x-1"
              >
                <span className="text-lg font-bold text-red-700 mr-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="أسئلة شائعة" id="faq">
          <AccordionItem
            question="ما هي شروط الترشح للانتخابات البرلمانية؟"
            answer="يجب أن يكون المرشح أردني الجنسية، أتم 30 عامًا، غير محكوم بجناية أو جنحة مخلة بالشرف، وأن يكون مسجلاً في أحد جداول الانتخاب."
          />
          <AccordionItem
            question="كيف يتم توزيع المقاعد في البرلمان؟"
            answer="يتم توزيع المقاعد بناءً على نسبة الأصوات التي تحصل عليها كل قائمة، مع مراعاة الكوتا المخصصة للنساء والأقليات."
          />
          <AccordionItem
            question="ما هو دور الهيئة المستقلة للانتخاب؟"
            answer="الهيئة المستقلة للانتخاب هي الجهة المسؤولة عن إدارة العملية الانتخابية وضمان نزاهتها، بدءًا من تسجيل الناخبين وحتى إعلان النتائج النهائية."
          />
        </Section>

        <Section title="المشاركة في الانتخابات" id="participation">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                المشاركة في الانتخابات حق وواجب وطني. تساهم مشاركتك في تشكيل
                مستقبل الأردن وتعزيز الديمقراطية. تأكد من تسجيلك كناخب والإدلاء
                بصوتك في يوم الانتخابات.
              </p>
            </div>
            <div className="md:w-1/2 h-48 relative overflow-hidden rounded-lg shadow-md">
              <img
                src={voter4}
                alt="المشاركة في الانتخابات في الأردن"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default About;
