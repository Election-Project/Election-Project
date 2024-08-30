import React, { useState, useEffect } from "react";
import voter1 from "../assets/img/voter1.png";
import voter2 from "../assets/img/voter2.png";
import voter3 from "../assets/img/voter3.png";
import voter4 from "../assets/img/voter4.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Section = ({ title, children, id }) => (
  <section
    id={id}
    className="mb-12 relative"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <h2 className="text-3xl font-bold mb-6 text-green-900 border-b-2 border-red-700 pb-2 inline-block mr-4">
      {title}
    </h2>
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {children}
    </div>
  </section>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-green-50 to-white rounded-lg shadow-sm overflow-hidden mb-4">
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
  <div className="bg-gradient-to-br from-white to-green-50 p-4 rounded-lg shadow-sm flex items-center space-x-3 transition-transform transform hover:scale-105">
    <span className="text-red-700 text-3xl">{icon}</span>
    <div>
      <h3 className="text-xs font-semibold text-green-900 mb-1">{title}</h3>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const About = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    AOS.init();
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

  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === "u" || e.key === "c")) {
        e.preventDefault();
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 2000);
      }
      if (e.key === "PrintScreen") {
        e.preventDefault();
        alert("لا يمكنك أخذ لقطة شاشة لهذه الصفحة.");
      }
    };

    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-green-50 text-gray-800 ${
        isBlurred ? "blur-sm" : ""
      }`}
    >
      <header className="bg-gradient-to-r from-red-900 to-green-800 text-white py-6 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-2 rtl:space-x-reverse overflow-x-auto">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-xs font-semibold py-2 px-4 rounded-full transition-all duration-300 ${
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
      <br />
      <br />
      <main className="container mx-auto lg:px-32 px-6 py-12 ">
        <Section title="نظرة عامة" id="overview">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تعتبر الانتخابات في الأردن عملية ديمقراطية حيوية تساهم في تحديد
                ممثلي الشعب في مختلف المجالات. يهدف النظام الانتخابي إلى تعزيز
                المشاركة الشعبية وضمان تمثيل متوازن للأفراد والمجتمعات في عملية
                اتخاذ القرار.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يشمل النظام الانتخابي في الأردن مجموعة من الخطوات التي تساهم في
                تنظيم العملية الانتخابية بشكل فعّال، بما في ذلك التسجيل،
                الترشيح، الحملة، والتصويت.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يقوم المواطنون بتسجيل أنفسهم في سجلات الناخبين، والتي يتم
                تحديثها بانتظام لضمان شموليتها ودقتها. بعد انتهاء عملية التسجيل،
                يمكن للمرشحين تقديم طلباتهم للترشح لمختلف المناصب، والتي تشمل
                النواب في البرلمان والمجالس المحلية.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تلي مرحلة الترشيح فترة الحملة الانتخابية، حيث يقوم المرشحون
                بترويج برامجهم وأفكارهم للمواطنين، ويتم تنظيم مناظرات وفعاليات
                لزيادة الوعي وتعزيز الحوار بين المرشحين والناخبين.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                في يوم الانتخابات، يتمكن الناخبون من الإدلاء بأصواتهم في مراكز
                الاقتراع المعتمدة، وتكون العملية تحت إشراف دقيق لضمان نزاهتها
                وشفافيتها. بعد إغلاق صناديق الاقتراع، تبدأ عملية العد والتدقيق
                لضمان دقة النتائج.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                يتم دعم العملية الانتخابية من خلال توعية المواطنين وتعليمهم حول
                حقوقهم وواجباتهم كمشاركين في العملية الديمقراطية. كما تسعى
                الجهات المعنية إلى تقديم المعلومات والإرشادات اللازمة لضمان
                تجربة انتخابية سلسة وفعالة.
              </p>
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src={voter1}
                alt="نظرة عامة على الانتخابات في الأردن"
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Section>

        <Section title="إحصائيات الانتخابات" id="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon="📅" title="تاريخ آخر انتخابات" value="2024" />
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
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يعتمد الأردن نظام القائمة النسبية المفتوحة في انتخاباته
                البرلمانية. يتيح هذا النظام للناخبين اختيار قائمة حزبية والتصويت
                لمرشحين محددين ضمن تلك القائمة. يتم توزيع المقاعد البرلمانية
                بناءً على النسبة المئوية للأصوات التي تحصل عليها كل قائمة حزبية
                في الانتخابات.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                هذا النظام يعزز من تمثيل الأحزاب والمرشحين، ويسهم في تقديم
                خيارات متنوعة للناخبين. حيث يمكن للناخبين أن يختاروا القوائم
                التي تعكس اهتماماتهم السياسية والاجتماعية، مما يساهم في تعزيز
                التنوع السياسي في البرلمان.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يسمح النظام المفتوح للناخبين بانتخاب مرشحين محددين من ضمن
                القائمة التي يختارونها، مما يعزز من تمثيل الأفراد. هذا يعني أن
                الناخبين يمكنهم التأثير على ترتيب المرشحين داخل القائمة، مما
                يساهم في تحسين جودة التمثيل البرلماني.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                كما يساهم النظام في زيادة شمولية الانتخابات، حيث يتمكن الناخبون
                من دعم مرشحين من خلفيات مختلفة وأحزاب متنوعة، مما يعزز من تمثيل
                مصالح شرائح واسعة من المجتمع.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                من جهة أخرى، قد تواجه عملية توزيع المقاعد بعض التحديات، مثل
                إمكانية حدوث تكتلات سياسية قد تؤثر على توازن القوى، إلا أن
                النظام يظل وسيلة فعالة لتعزيز التمثيل الديمقراطي وتحقيق التوازن
                بين القوى السياسية.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                في النهاية، يمثل نظام القائمة النسبية المفتوحة خطوة مهمة نحو
                تطوير العملية الديمقراطية في الأردن، من خلال تمكين الناخبين من
                اختيار ممثليهم بناءً على أفضلياتهم الشخصية والسياسية.
              </p>
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src={voter2}
                alt="النظام الانتخابي"
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Section>

        <Section title="أسئلة شائعة" id="faq">
          <AccordionItem
            question="ما هي مدة الانتخابات في الأردن؟"
            answer="تستمر الانتخابات في الأردن عادة لمدة يوم واحد، حيث يتم التصويت في نفس اليوم."
          />
          <AccordionItem
            question="كيف يتم الإعلان عن النتائج؟"
            answer="تعلن النتائج بعد الانتهاء من عملية الفرز والتأكد من صحة الأصوات."
          />
          <AccordionItem
            question="هل يمكن تغيير مكان التصويت؟"
            answer="نعم، يمكن للمواطنين تغيير مكان التصويت بناءً على تحديثات في سجلاتهم."
          />
        </Section>

        <Section title="الدوائر الانتخابية" id="districts">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تتوزع الدوائر الانتخابية في الأردن على مناطق جغرافية مختلفة، حيث
                يتم تقسيم البلاد إلى دوائر انتخابية لتمثيل مختلف المناطق في
                البرلمان. يتم تصميم هذه الدوائر بحيث تعكس التوزيع السكاني
                والاقتصادي للمناطق المختلفة.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يهدف تقسيم الدوائر إلى ضمان تمثيل عادل ومتوازن لجميع المناطق
                والأقاليم. يساعد هذا التوزيع في تحقيق التوازن بين المناطق
                الحضرية والريفية، وكذلك بين المناطق الكبرى والصغرى، مما يعزز من
                العدالة في التمثيل البرلماني.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                يتم تنظيم الانتخابات وفقاً لهذه الدوائر، حيث يتم انتخاب الممثلين
                بناءً على تقسيم المناطق الجغرافية. كل دائرة انتخابية تختار
                ممثليها الذين سيقومون بتمثيل مصالحها في البرلمان، مما يضمن أن
                تكون أصوات المواطنين من جميع أنحاء البلاد مسموعة وممثلة بشكل
                عادل.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                يعزز هذا النظام من فعالية العملية الديمقراطية ويتيح لكل منطقة أن
                تكون لها دور في تشكيل السياسات واتخاذ القرارات التي تؤثر على
                حياتها اليومية. كما يساهم في تعزيز المشاركة السياسية ويساعد على
                بناء الثقة بين المواطنين والمؤسسات الحكومية.
              </p>
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src={voter3}
                alt="الدوائر الانتخابية"
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Section>

        <Section title="المراحل الانتخابية" id="process">
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تمر العملية الانتخابية بعدة مراحل رئيسية، بدءاً من التسجيل
                والتأكد من أهلية الناخبين، وصولاً إلى التصويت والفرز. تتضمن هذه
                المراحل تأكيد تسجيل الناخبين وتحديث سجلاتهم لضمان دقة البيانات
                وشمولية التسجيل.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تشمل المراحل الأخرى الحملة الانتخابية، حيث يعمل المرشحون على
                الترويج لبرامجهم وأفكارهم عبر مختلف وسائل الإعلام والتواصل
                الاجتماعي. يتم تنظيم فعاليات ومؤتمرات لزيادة الوعي وتعزيز
                التواصل مع الناخبين.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                تتمثل المرحلة الأخيرة في عملية التصويت، حيث يقوم الناخبون
                بالإدلاء بأصواتهم في مراكز الاقتراع. بعد إغلاق صناديق الاقتراع،
                تبدأ عملية الفرز، والتي تتضمن جمع وتدقيق الأصوات للتأكد من صحتها
                وشفافيتها.
              </p>
              <p className="text-base leading-relaxed text-gray-800 mb-4">
                بعد الفرز، يتم إعلان النتائج وتوثيق العملية الانتخابية من قبل
                الجهات المختصة. يتم التأكد من نزاهة وشفافية العملية، ويُعلن عن
                النتائج النهائية التي تعكس إرادة الناخبين.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                تعتبر هذه المراحل ضرورية لضمان عملية انتخابية عادلة وشفافة، مما
                يعزز من ثقة المواطنين في النظام الانتخابي ويضمن تمثيلهم بشكل
                صحيح في الانتخابات.
              </p>
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src={voter4}
                alt="المراحل الانتخابية"
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Section>

        <Section title="المشاركة في الانتخابات" id="participation">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-800">
                تشجع السلطات الأردنية جميع المواطنين على المشاركة في الانتخابات
                لتعزيز العملية الديمقراطية وضمان تمثيل جميع الفئات في البرلمان.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                يتم توفير المعلومات اللازمة للناخبين من خلال حملات توعية وتدريب
                لتعريفهم بكيفية التسجيل والتصويت.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                يمكن للناخبين الاطلاع على معلومات إضافية من خلال الموقع
                الإلكتروني للهيئة المستقلة للانتخاب.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-64 h-64 text-green-500"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l2 2"
                />
              </svg>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default About;
