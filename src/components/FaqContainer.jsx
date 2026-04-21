import { useState } from 'react';

function FaqContainer() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "अभ्यासिकेत पुस्तके उपलब्ध आहेत का?",
      answer:
        "नाही, आमच्या अभ्यासिकेत पुस्तके उपलब्ध नाहीत. आम्ही फक्त शांत अभ्यास कक्ष आणि सुविधा पुरवतो. तुम्हाला तुमची स्वतःची अभ्यास सामग्री आणावी लागेल.",
    },
    {
      id: 2,
      question: "रात्री उशीरापर्यंत अभ्यास करता येतो का?",
      answer:
        "होय! पूर्ण दिवस योजनेसह तुम्ही 24 तास, 7 दिवस अभ्यास करू शकता. रात्री सुरक्षा रक्षक उपलब्ध असतात.",
    },
    {
      id: 3,
      question: "कक्ष बदलता येतो का?",
      answer:
        "होय, तुम्ही कधीही कक्ष अपग्रेड करू शकता. फक्त रिसेप्शनवर संपर्क करा आणि उपलब्धतेनुसार कक्ष बदला.",
    },
    {
      id: 4,
      question: "मुलींसाठी वेगळी व्यवस्था आहे का?",
      answer:
        "होय, मुलींसाठी स्वतंत्र मजला उपलब्ध आहे. CCTV कॅमेरे आणि महिला सुरक्षा रक्षक नेमलेले आहेत.",
    },
    {
      id: 5,
      question: "पैसे परत मिळतात का?",
      answer:
        "सुरुवातीच्या 7 दिवसात तुम्ही समाधानी नसल्यास पूर्ण पैसे परत मिळतात. यासाठी रिसेप्शनवर अर्ज करा.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-question text-primary-600"></i>
            <span className="text-primary-700 text-sm font-semibold">
              वारंवार विचारले जाणारे प्रश्न
            </span>
          </div>
          <h2 className="text-4xl font-black text-dark-900 relative inline-block line-decoration">
            <span className="gradient-text">FAQ</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="faq-item bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-dark-800 text-lg pr-4">
                  {faq.question}
                </span>
                <i
                  className={`fas fa-chevron-down text-primary-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-dark-500 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqContainer;