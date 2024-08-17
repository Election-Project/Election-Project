import React, { useState } from 'react';
import voter1 from "../assets/img/voter1.png"
import voter2 from "../assets/img/voter2.png"
import voter3 from ".../assets/img/voter3.png"
import voter4 from "../assets/img/voter4.png"
const Section = ({ title, children }) => (
  <div className="mb-12 p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-green-700 border-b-2 border-red-600 pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-200">
      <button
        aria-expanded={isOpen}
        className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-green-800">{question}</span>
        <span className="text-red-600 text-2xl">{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="p-6 bg-green-50 text-black rounded-b">{answer}</p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <span className="text-red-600 text-4xl">{icon}</span>
    <div>
      <h3 className="text-lg font-semibold text-green-700">{title}</h3>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-green-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold  text-center">الانتخابات في الأردن</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Section title="نظرة عامة">
          <p className="text-lg mb-6">
            تعتبر الانتخابات في الأردن عملية ديمقراطية حيوية تساهم في تحديد ممثلي الشعب في مختلف
            المجالات. يهدف النظام الانتخابي إلى تعزيز المشاركة الشعبية وضمان تمثيل متوازن
            للأفراد والمجتمعات في عملية اتخاذ القرار.
          </p>
          <img
            src={voter1}
            alt="نظرة عامة على الانتخابات في الأردن"
            className="w-full rounded-lg shadow-md mb-6"
          />
        </Section>

        <Section title="إحصائيات الانتخابات">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard icon="📅" title="تاريخ آخر انتخابات" value="2020" />
            <StatCard icon="👥" title="عدد الناخبين المسجلين" value="4.64 مليون" />
            <StatCard icon="🗳️" title="نسبة المشاركة" value="29.9%" />
            <StatCard icon="🏛️" title="عدد المقاعد البرلمانية" value="130" />
          </div>
        </Section>

        <Section title="النظام الانتخابي">
          <p className="text-lg mb-6">
            يعتمد الأردن نظام القائمة النسبية المفتوحة في انتخاباته البرلمانية. يتيح هذا النظام
            للناخبين اختيار قائمة حزبية والتصويت لمرشحين محددين ضمن تلك القائمة.
          </p>
          <img
            src={voter3}
            alt="النظام الانتخابي الأردني"
            className="w-full rounded-lg shadow-md mb-6"
          />
        </Section>

        <Section title="الدوائر الانتخابية">
          <p className="text-lg mb-6">
            ينقسم الأردن إلى 23 دائرة انتخابية، موزعة على 12 محافظة. تختلف كل دائرة في عدد
            المقاعد المخصصة لها بناءً على الكثافة السكانية والتمثيل الجغرافي.
          </p>
          <img
            src={voter2}
            alt="الدوائر الانتخابية في الأردن"
            className="w-full rounded-lg shadow-md mb-6"
          />
        </Section>

        <Section title="مراحل العملية الانتخابية">
          <ol className="list-decimal list-inside space-y-4 text-lg">
            <li>تسجيل الناخبين وتحديث سجلات الناخبين</li>
            <li>إعلان موعد الانتخابات وفتح باب الترشح</li>
            <li>فترة الحملات الانتخابية</li>
            <li>يوم الاقتراع</li>
            <li>فرز الأصوات وإعلان النتائج</li>
          </ol>
        </Section>

        <Section title="أسئلة شائعة">
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

        <Section title="المشاركة في الانتخابات">
          <p className="text-lg mb-6">
            المشاركة في الانتخابات حق وواجب وطني. تساهم مشاركتك في تشكيل مستقبل الأردن وتعزيز
            الديمقراطية. تأكد من تسجيلك كناخب والإدلاء بصوتك في يوم الانتخابات.
          </p>
          <img
            src={voter4}
            alt="المشاركة في الانتخابات في الأردن"
            className="w-full rounded-lg shadow-md mb-6"
          />
        </Section>
      </main>

    </div>
  );
};

export default About;
