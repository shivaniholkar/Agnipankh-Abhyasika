import whyus from '../assets/whyus.jpg'

function WhyUs() {
  const reasons = [
    {
      id: 1,
      number: "1",
      bgColor: "bg-primary-600",
      borderColor: "border-primary-600",
      bgGradient: "from-primary-50",
      title: "100% शांत वातावरण",
      description:
        "ध्वनिरोधक तंत्रज्ञान — बाहेरचा कोणताही आवाज आत येत नाही",
    },
    {
      id: 2,
      number: "2",
      bgColor: "bg-accent",
      borderColor: "border-accent",
      bgGradient: "from-orange-50",
      title: "स्पर्धा परीक्षांसाठी सर्वोत्तम",
      description:
        "UPSC, MPSC, पोलीस भरती  — सर्व स्पर्धा परीक्षांच्या तयारीसाठी आदर्श ठिकाण",
    },
    {
      id: 3,
      number: "3",
      bgColor: "bg-green-600",
      borderColor: "border-green-600",
      bgGradient: "from-green-50",
      title: "परवडणारे दर",
      description: "प्रीमियम सुविधा — बजेट फ्रेंडली दरात",
    },
    {
      id: 4,
      number: "4",
      bgColor: "bg-purple-600",
      borderColor: "border-purple-600",
      bgGradient: "from-purple-50",
      title: "सुरक्षित आणि विश्वासार्ह",
      description:
        "CCTV कॅमेरे, बायोमेट्रिक प्रवेश, मुलींसाठी विशेष सुरक्षा",
    },
  ];

  const floatingStats = [
    {
      id: 1,
      position: "absolute -bottom-8 -left-8",
      iconClass: "fas fa-chart-line",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      value: "95%",
      label: "विद्यार्थी समाधान दर",
    },
    {
      id: 2,
      position: "absolute -top-8 -right-8",
      iconClass: "fas fa-trophy",
      iconColor: "text-primary-600",
      iconBg: "bg-primary-100",
      value: "500+",
      label: "यशस्वी विद्यार्थी",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Reasons */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-question-circle text-green-600"></i>
              <span className="text-green-700 text-sm font-semibold">
                आम्हीच का?
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-8 leading-tight">
              अग्निपंख{" "}
              <span className="gradient-text">अभ्यासिका</span> का निवडावी?
            </h2>

            {/* Reasons List */}
            <div className="space-y-6">
              {reasons.map((reason) => (
                <div
                  key={reason.id}
                  className={`flex items-start space-x-4 p-5 bg-gradient-to-r ${reason.bgGradient} to-transparent rounded-2xl border-l-4 ${reason.borderColor}`}
                >
                  {/* Number Badge */}
                  <div
                    className={`w-10 h-10 ${reason.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold`}
                  >
                    {reason.number}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="font-bold text-dark-800 text-lg">
                      {reason.title}
                    </h4>
                    <p className="text-dark-500 mt-1">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image & Floating Stats */}
          <div className="relative">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-primary-100 to-orange-100 rounded-3xl p-8">
              <img
                src={whyus}
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                alt="अभ्यासरत विद्यार्थी"
              />
            </div>

            {/* Floating Stat Cards */}
            {floatingStats.map((stat) => (
              <div
                key={stat.id}
                className={`${stat.position} bg-white shadow-2xl rounded-2xl p-6 max-w-[250px]`}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center`}
                  >
                    <i className={`${stat.iconClass} ${stat.iconColor} text-xl`}></i>
                  </div>

                  {/* Stats */}
                  <div>
                    <div className="text-2xl font-black text-dark-900">
                      {stat.value}
                    </div>
                    <div className="text-dark-500 text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;