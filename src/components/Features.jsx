// import ScrollReveal from "./ScrollReveal";

function Features() {
  const features = [
    {
      id: 1,
      iconClass: "fas fa-snowflake",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      shadowColor: "shadow-blue-500/30",
      title: "वातानुकूलित कक्ष",
      description:
        "पूर्णपणे AC अभ्यास कक्ष — उन्हाळा असो वा हिवाळा, आरामदायक तापमान कायम.",
    },
    {
      id: 2,
      iconClass: "fas fa-wifi",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      shadowColor: "shadow-green-500/30",
      title: "हाय-स्पीड WiFi",
      description:
        "100 Mbps हाय-स्पीड इंटरनेट — ऑनलाईन अभ्यास, व्हिडिओ लेक्चर्स सहज पहा.",
    },
    {
      id: 3,
      iconClass: "fas fa-plug",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      shadowColor: "shadow-purple-500/30",
      title: "पॉवर आउटलेट",
      description:
        "प्रत्येक डेस्कला चार्जिंग पॉइंट — लॅपटॉप, मोबाईल सहज चार्ज करा.",
    },
    {
      id: 4,
      iconClass: "fas fa-lightbulb",
      gradientFrom: "from-orange-500",
      gradientTo: "to-accent",
      shadowColor: "shadow-orange-500/30",
      title: "LED दिवे",
      description:
        "डोळ्यांना आरामदायक प्रकाश व्यवस्था — दीर्घ अभ्यासासाठी योग्य.",
    },
    {
      id: 5,
      iconClass: "fas fa-video",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-600",
      shadowColor: "shadow-red-500/30",
      title: "CCTV सुरक्षा",
      description:
        "24 तास CCTV निगराणी — तुमच्या सुरक्षिततेची पूर्ण खात्री.",
    },
    {
      id: 6,
      iconClass: "fas fa-coffee",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-600",
      shadowColor: "shadow-teal-500/30",
      title: "कॅफेटेरिया",
      description:
        "चहा, कॉफी आणि नाश्ता उपलब्ध — अभ्यासात ऊर्जा कायम ठेवा.",
    },
    {
      id: 7,
      iconClass: "fas fa-lock",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-indigo-600",
      shadowColor: "shadow-indigo-500/30",
      title: "लॉकर सुविधा",
      description:
        "प्रत्येक कक्षासोबत वैयक्तिक लॉकर — तुमचे सामान सुरक्षित ठेवा.",
    },
    {
      id: 8,
      iconClass: "fas fa-toilet",
      gradientFrom: "from-pink-500",
      gradientTo: "to-pink-600",
      shadowColor: "shadow-pink-500/30",
      title: "स्वच्छ शौचालय",
      description:
        "स्वच्छ आणि आरोग्यदायी शौचालय व्यवस्था — नेहमी स्वच्छ.",
    },
  ];

  const extraFeatures = [
    {
      id: 1,
      iconClass: "fas fa-parking",
      title: "मोफत पार्किंग",
      description: "दुचाकी व चारचाकी पार्किंग",
    },
    {
      id: 2,
      iconClass: "fas fa-tint",
      title: "शुद्ध पिण्याचे पाणी",
      description: "RO शुद्ध पाणी मोफत",
    },
    {
      id: 3,
      iconClass: "fas fa-print",
      title: "प्रिंटर/झेरॉक्स",
      description: "कमी दरात प्रिंट सुविधा",
    },
    {
      id: 4,
      iconClass: "fas fa-first-aid",
      title: "प्रथमोपचार",
      description: "आपत्कालीन मदत उपलब्ध",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-100 to-gray-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        {/* <ScrollReveal animation="slide-up delay={200}"> */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-gem text-primary-600"></i>
              <span className="text-primary-700 text-sm font-semibold">
                प्रीमियम सुविधा
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
              आम्ही काय <span className="gradient-text">देतो</span>?
            </h2>
            <p className="text-dark-500 text-lg mt-8">
              अभ्यासासाठी लागणाऱ्या सर्व सुविधा एकाच ठिकाणी — फक्त तुमचे पुस्तक
              आणा, बाकी सगळे आमच्यावर सोडा!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="feature-card card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 group"
              >
                {/* Icon */}
                <div
                  className={`feature-icon w-16 h-16 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.shadowColor}`}
                >
                  <i className={`${feature.iconClass} text-white text-2xl`}></i>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-dark-800 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-dark-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        {/* </ScrollReveal> */}

        {/* Extra Features Banner */}
        {/* <ScrollReveal animation="slide-up" delay={200}> */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 lg:p-12 text-white">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {extraFeatures.map((item) => (
                <div key={item.id}>
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${item.iconClass} text-2xl`}></i>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-lg">{item.title}</h4>

                  {/* Description */}
                  <p className="text-primary-200 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        {/* </ScrollReveal> */}
      </div>
    </section>
  );
}

export default Features;