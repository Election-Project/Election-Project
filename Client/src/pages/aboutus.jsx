import { useState } from "react";

import voter1 from "../assets/img/voter1.png";
import voter2 from "../assets/img/voter2.png";




const Aboutus = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">عن الانتخابات في الأردن</h1>
        <p className="text-lg mb-6">
          تعتبر الانتخابات في الأردن عملية ديمقراطية حيوية تساهم في تحديد ممثلي
          الشعب في مختلف المجالات. يهدف النظام الانتخابي إلى تعزيز المشاركة
          الشعبية وضمان تمثيل متوازن للأفراد والمجتمعات في عملية اتخاذ القرار.
        </p>
        <img
          src={voter2}
          alt="Election in Jordan"
          className="w-full max-w-2xl mb-6 rounded shadow-lg"
        />
        <p className="text-lg mb-6">
          تسعى الانتخابات إلى ضمان نزاهة العملية الانتخابية من خلال استخدام
          إجراءات شفافة وقوانين صارمة لضمان عدم التلاعب والتزوير. كما يشمل
          النظام الانتخابي في الأردن تخصيص مقاعد معينة للنساء والشباب لتعزيز
          تمثيلهم في البرلمان.
        </p>
        <img
          src={voter1}
          alt="Election Process"
          className="w-full max-w-2xl mb-6 rounded shadow-lg"
        />
        <p className="text-lg mb-6">
          المشاركة في الانتخابات تعتبر واجبًا وطنيًا وفرصة للتأثير في مستقبل
          البلاد. تدعو الهيئة المستقلة للانتخاب جميع المواطنين إلى المشاركة
          الفعالة في العملية الانتخابية لضمان تمثيل عادل وشامل للجميع.
        </p>

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">
            عملية الانتخابات في الأردن
          </h2>
          <p className="text-lg mb-6">
            تبدأ العملية الانتخابية في الأردن بإصدار الهيئة المستقلة للانتخاب
            قوائم المرشحين وتحديد موعد الانتخابات. تشمل العملية تقديم الطلبات،
            التحقق من المرشحين، وتنظيم الحملات الانتخابية. بعد انتهاء فترة
            الحملات، يتم إجراء الانتخابات تحت إشراف الهيئة لضمان نزاهة العملية.
          </p>
          <p className="text-lg mb-6">
            يتم فرز الأصوات وإعلان النتائج بعد انتهاء الانتخابات، مع ضمان توفير
            الشفافية والمصداقية في كل مرحلة من مراحل العملية الانتخابية.
          </p>
        </div>

        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-2xl font-bold mb-4">أسئلة وأجوبة</h2>
          {[
            {
              question: "ما هي متطلبات الترشح للانتخابات؟",
              answer:
                "يشترط أن يكون المرشح مواطناً أردنياً، عمره لا يقل عن 30 عاماً، وأن يكون قد أنهى دراسته الثانوية كحد أدنى.",
            },
            {
              question: "كيف يتم التصويت في الانتخابات؟",
              answer:
                "يتم التصويت عبر الإنترنت من خلال الدخول إلى الموقع الإلكتروني المخصص للانتخابات، حيث يقوم الناخب بتسجيل دخوله باستخدام معلوماته الشخصية، ومن ثم يمكنه التصويت بسرية وأمان",
            },
            {
              question: "ما هي إجراءات ضمان نزاهة الانتخابات؟",
              answer:
                "تتضمن الإجراءات مراقبة شاملة من قبل الهيئة المستقلة للانتخاب، استخدام أجهزة للتأكد من صحة التصويت، وتنظيم حملات توعية.",
            },
          ].map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left py-2 px-4 bg-gray-200 rounded"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </button>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  isOpen === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="p-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
