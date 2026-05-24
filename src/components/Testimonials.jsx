function Testimonials() {
  const testimonials = [
    {
      id: 1,
      cardBg: "from-primary-50",
      borderColor: "border-primary-100",
      quoteColor: "text-primary-200",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ],
      review:
        "अग्निपंख अभ्यासिकेमुळे माझी MPSC ची तयारी उत्तम झाली. शांत वातावरण आणि आरामदायक कक्ष — माझ्या यशाचे श्रेय या अभ्यासिकेला!",
      avatarLabel: "अ",
      avatarGradient: "from-primary-400 to-primary-600",
      name: "अक्षय पवार",
      achievement: "PSI (MPSC उत्तीर्ण - 2024)",
      achievementColor: "text-primary-600",
    },
    {
      id: 2,
      cardBg: "from-orange-50",
      borderColor: "border-orange-100",
      quoteColor: "text-orange-200",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ],
      review:
        "घरी अभ्यास करताना एकाग्रता लागत नव्हती. इथे आल्यापासून माझा अभ्यासाचा वेळ दुप्पट झाला. AC, WiFi, चहा — सगळं मिळतं!",
      avatarLabel: "शी",
      avatarGradient: "from-orange-400 to-accent",
      name: "शीतल खाडे",
      achievement: "Mumbai Police",
      achievementColor: "text-accent",
    },
    {
      id: 3,
      cardBg: "from-green-50",
      borderColor: "border-green-100",
      quoteColor: "text-green-200",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star-half-alt",
      ],
      review:
        "JEE Advanced ची तयारी करताना दररोज 12 तास इथे अभ्यास केला. रात्री उशीरापर्यंत अभ्यास करता येतो. खूपच छान अनुभव!",
      avatarLabel: "अ",
      avatarGradient: "from-green-400 to-green-600",
      name: "अर्जुन करांडे",
      achievement: "IIT मुंबई - 2024",
      achievementColor: "text-green-600",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full filter blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 bg-gold-400/20 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-quote-left text-gold-600"></i>
            <span className="text-gold-600 text-sm font-semibold">
              विद्यार्थ्यांचे अभिप्राय
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
            आमचे <span className="gradient-text">यशस्वी विद्यार्थी</span> काय
            म्हणतात?
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`card-hover bg-gradient-to-br ${testimonial.cardBg} to-white rounded-3xl p-8 border ${testimonial.borderColor} relative`}
            >
              {/* Quote Icon */}
              <div
                className={`absolute top-6 right-6 ${testimonial.quoteColor}`}
              >
                <i className="fas fa-quote-right text-4xl"></i>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {testimonial.stars.map((starClass, index) => (
                  <i
                    key={index}
                    className={`${starClass} text-gold-500`}
                  ></i>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-dark-600 leading-relaxed mb-6 text-lg italic">
                "{testimonial.review}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${testimonial.avatarGradient} rounded-full flex items-center justify-center text-white text-xl font-bold`}
                >
                  {testimonial.avatarLabel}
                </div>

                {/* Name & Achievement */}
                <div>
                  <div className="font-bold text-dark-800 text-lg">
                    {testimonial.name}
                  </div>
                  <div
                    className={`${testimonial.achievementColor} text-sm font-medium`}
                  >
                    {testimonial.achievement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;