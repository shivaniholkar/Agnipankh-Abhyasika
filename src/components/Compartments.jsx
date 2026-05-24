function Compartments() {
  const compartments = [
    {
      id: 1,
      type: "साधारण",
      title: "ओपन डेस्क",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=300&fit=crop",
      imageAlt: "साधारण कक्ष",
      badgeClass: "bg-primary-600",
      isPopular: false,
      cardClass: "border border-gray-100",
      priceOriginal: "₹1500/महिना",
      price: "₹999",
      priceLabel: "/महिना",
      priceClass: "text-dark-900",
      bookBtnClass: "bg-dark-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-dark-800 transition-colors",
      features: [
        { text: "आरामदायक खुर्ची व टेबल", available: true },
        { text: "LED टेबल लॅम्प", available: true },
        { text: "चार्जिंग पॉइंट", available: true },
        { text: "WiFi सुविधा", available: true },
        { text: "खाजगी विभाजन नाही", available: false },
      ],
    },
    {
      id: 2,
      type: "प्रीमियम",
      title: "सेमी-प्रायव्हेट कक्ष",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
      imageAlt: "प्रीमियम कक्ष",
      badgeClass: "bg-gradient-to-r from-primary-600 to-accent",
      isPopular: true,
      cardClass: "border-2 border-primary-500",
      priceOriginal: "₹2500/महिना",
      price: "₹1799",
      priceLabel: "/महिना",
      priceClass: "gradient-text",
      bookBtnClass:
        "btn-premium bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg shadow-primary-600/30",
      features: [
        { text: "तीन बाजूंनी विभाजन", available: true },
        { text: "एर्गोनोमिक खुर्ची", available: true },
        { text: "वैयक्तिक लॉकर", available: true },
        { text: "हाय-स्पीड WiFi", available: true },
        { text: "चहा/कॉफी मोफत", available: true },
      ],
    },
    {
      id: 3,
      type: "एक्झिक्युटिव्ह",
      title: "पूर्ण खाजगी कक्ष",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=500&h=300&fit=crop",
      imageAlt: "एक्झिक्युटिव्ह कक्ष",
      badgeClass: "bg-gradient-to-r from-gold-500 to-accent",
      isPopular: false,
      cardClass: "border border-gray-100",
      priceOriginal: "₹4000/महिना",
      price: "₹2999",
      priceLabel: "/महिना",
      priceClass: "text-dark-900",
      bookBtnClass:
        "bg-dark-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-dark-800 transition-colors",
      features: [
        { text: "पूर्ण खाजगी बंदिस्त कक्ष", available: true },
        { text: "ध्वनिरोधक भिंती", available: true },
        { text: "वैयक्तिक AC नियंत्रण", available: true },
        { text: "प्रीमियम फर्निचर", available: true },
        { text: "मोफत नाश्ता + चहा/कॉफी", available: true },
      ],
    },
  ];

  return (
    <section id="compartments" className="py-24 bg-white relative overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent to-primary-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-door-open text-accent"></i>
            <span className="text-accent text-sm font-semibold">अभ्यास कक्ष प्रकार</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
            तुमच्या इच्छेनुसार {" "}
            <span className="gradient-text">कक्ष आणि डेस्क निवडा</span>
          </h2>
          <p className="text-dark-500 text-lg mt-8">
            प्रत्येक विद्यार्थ्याची गरज वेगळी असते. म्हणून आम्ही विविध प्रकारचे
            अभ्यास कक्ष उपलब्ध करून दिले आहेत.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {compartments.map((room) => (
            <div
              key={room.id}
              className={`card-hover group bg-white rounded-3xl overflow-hidden shadow-xl relative ${room.cardClass}`}
            >
              {/* Popular Badge */}
              {room.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary-600 to-primary-500 text-white px-6 py-2 rounded-bl-2xl text-sm font-bold z-10">
                  <i className="fas fa-fire mr-1"></i> सर्वाधिक लोकप्रिय
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={room.imageAlt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>

                {/* Room Type Badge */}
                <div className={`absolute top-4 left-4 ${room.badgeClass} text-white px-4 py-1.5 rounded-full text-sm font-bold`}>
                  {room.type}
                </div>

                {/* Room Title */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-black">{room.title}</div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {room.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center space-x-3 ${
                        feature.available ? "text-dark-600" : "text-dark-400"
                      }`}
                    >
                      <i
                        className={`${
                          feature.available
                            ? "fas fa-check-circle text-green-500"
                            : "fas fa-times-circle text-gray-300"
                        }`}
                      ></i>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-dark-400 text-sm line-through">
                      {room.priceOriginal}
                    </span>
                    <div className={`text-3xl font-black ${room.priceClass}`}>
                      {room.price}
                      <span className="text-base font-normal text-dark-500">
                        {room.priceLabel}
                      </span>
                    </div>
                  </div>
                  <a href="#booking" className={room.bookBtnClass}>
                    बुक करा
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Compartments;