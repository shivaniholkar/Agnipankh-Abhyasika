function Rules() {
  const rules = [
    {
      id: 1,
      iconClass: "fas fa-volume-mute",
      iconBg: "bg-red-500",
      cardBg: "bg-red-50",
      borderColor: "border-red-100",
      title: "पूर्ण शांतता पाळा",
      description: "मोबाईल सायलेंट मोडवर ठेवा",
    },
    {
      id: 2,
      iconClass: "fas fa-smoking-ban",
      iconBg: "bg-accent",
      cardBg: "bg-orange-50",
      borderColor: "border-orange-100",
      title: "धूम्रपान बंदी",
      description: "संपूर्ण परिसरात धूम्रपान प्रतिबंधित",
    },
    {
      id: 3,
      iconClass: "fas fa-id-card",
      iconBg: "bg-blue-500",
      cardBg: "bg-blue-50",
      borderColor: "border-blue-100",
      title: "ओळखपत्र अनिवार्य",
      description: "प्रवेशासाठी ओळखपत्र दाखवा",
    },
    {
      id: 4,
      iconClass: "fas fa-broom",
      iconBg: "bg-green-500",
      cardBg: "bg-green-50",
      borderColor: "border-green-100",
      title: "स्वच्छता राखा",
      description: "कक्ष स्वच्छ ठेवा, कचरा कचरापेटीत टाका",
    },
    {
      id: 5,
      iconClass: "fas fa-utensils",
      iconBg: "bg-purple-500",
      cardBg: "bg-purple-50",
      borderColor: "border-purple-100",
      title: "कक्षात खाणे बंदी",
      description: "खाण्यासाठी कॅफेटेरिया वापरा",
    },
    {
      id: 6,
      iconClass: "fas fa-handshake",
      iconBg: "bg-indigo-500",
      cardBg: "bg-indigo-50",
      borderColor: "border-indigo-100",
      title: "शिस्त पाळा",
      description: "इतर विद्यार्थ्यांचा आदर करा",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-gavel text-red-600"></i>
            <span className="text-red-700 text-sm font-semibold">
              नियम व अटी
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
            अभ्यासिकेचे <span className="gradient-text">नियम</span>
          </h2>
        </div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-start space-x-4 p-5 ${rule.cardBg} rounded-2xl border ${rule.borderColor}`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 ${rule.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <i className={`${rule.iconClass} text-white`}></i>
              </div>

              {/* Content */}
              <div>
                <h4 className="font-bold text-dark-800">{rule.title}</h4>
                <p className="text-dark-500 text-sm mt-1">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rules;