import { useState } from 'react';

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 1,
      iconClass: "fas fa-sun",
      iconColor: "text-primary-400",
      iconBg: "bg-primary-500/20",
      title: "दैनिक पास",
      subtitle: "एक दिवसासाठी",
      monthlyPrice: "₹49",
      yearlyPrice: "₹39",
      priceLabel: "/दिवस",
      priceLabelYearly: "/दिवस",
      isPopular: false,
      cardClass: "hover:border-primary-500/50",
      btnClass:
        "block w-full text-center glass text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20",
      btnLabel: "दैनिक पास घ्या",
      features: [
        { text: "कोणताही कक्ष", available: true },
        { text: "WiFi सुविधा", available: true },
        { text: "चार्जिंग पॉइंट", available: true },
        { text: "पिण्याचे पाणी", available: true },
        // { text: "लॉकर नाही", available: false },
      ],
    },
    {
      id: 2,
      iconClass: "fas fa-gem",
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-primary-500 to-accent shadow-lg shadow-primary-500/30",
      title: "मासिक योजना (Slot 1)",
      subtitle: "6 AM - 11 PM",
      monthlyPrice: "₹500",
      yearlyPrice: "₹400",
      priceLabel: "/महिना",
      priceLabelYearly: "/महिना",
      isPopular: true,
      cardClass: "border-2 border-primary-500/50 scale-105",
      btnClass:
        "btn-premium block w-full text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-xl shadow-primary-600/30",
      btnLabel: "मासिक योजना निवडा",
      features: [
        // { text: "सेमी-प्रायव्हेट कक्ष", available: true },
        { text: "हाय-स्पीड WiFi", available: true },
        { text: "वैयक्तिक लॉकर", available: true },
        // { text: "मोफत चहा/कॉफी", available: true },
        { text: "24/7 प्रवेश", available: true },
      ],
    },
    {
      id: 3,
      iconClass: "fas fa-gem",
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/20",
      title: "मासिक योजना (Slot 2)",
      subtitle: "24 hrs",
      monthlyPrice: "₹700",
      yearlyPrice: "₹560",
      priceLabel: "/प्रत्येकी/महिना",
      priceLabelYearly: "/प्रत्येकी/महिना",
      isPopular: false,
      cardClass: "hover:border-primary-500/50",
      btnClass:
        "block w-full text-center glass text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20",
      btnLabel: "ग्रुप योजना निवडा",
      features: [
        { text: "ग्रुप स्टडी रूम", available: true },
        { text: "व्हाईटबोर्ड सुविधा", available: true },
        { text: "WiFi + चार्जिंग", available: true },
        { text: "चहा/कॉफी मोफत", available: true },
        { text: "ग्रुप डिस्काउंट", available: true },
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 hero-gradient relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
            <i className="fas fa-tags text-gold-400"></i>
            <span className="text-gold-400 text-sm font-semibold">दरपत्रक</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            तुमच्या बजेटनुसार{" "}
            <span className="gradient-gold">योजना निवडा</span>
          </h2>
          <p className="text-gray-400 text-lg">
            दैनिक, मासिक आणि वार्षिक — सर्व प्रकारच्या योजना उपलब्ध!
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-16">
          <span className={`font-medium transition-colors duration-300 ${!isYearly ? "text-white" : "text-gray-400"}`}>
            मासिक
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 bg-primary-600 rounded-full relative cursor-pointer transition-colors duration-300"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 ${
                isYearly ? "translate-x-8" : "translate-x-1"
              }`}
            ></div>
          </button>
          <span className={`font-medium transition-colors duration-300 ${isYearly ? "text-white" : "text-gray-400"}`}>
            वार्षिक{" "}
            <span className="text-green-400 text-xs font-bold ml-1">
              20% बचत
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-glow relative glass rounded-3xl p-8 lg:p-10 transition-all duration-500 ${plan.cardClass}`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-600 to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  <i className="fas fa-crown mr-1"></i> सर्वोत्तम मूल्य
                </div>
              )}

              {/* Card Header */}
              <div className="text-center mb-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${plan.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <i className={`${plan.iconClass} ${plan.iconColor} text-2xl`}></i>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-400">{plan.subtitle}</p>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-5xl font-black text-white transition-all duration-300">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {isYearly ? plan.priceLabelYearly : plan.priceLabel}
                  </span>
                </div>
              </div>

              {/* Features List */}
              {/* <ul className="space-y-4 mb-10">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 ${
                      feature.available ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    <i
                      className={
                        feature.available
                          ? "fas fa-check text-green-400"
                          : "fas fa-times text-gray-600"
                      }
                    ></i>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul> */}

              {/* CTA Button */}
              <a href="#booking" className={plan.btnClass}>
                {plan.btnLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;