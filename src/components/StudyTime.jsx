function StudyTime() {
  const schedules = [
    {
      id: 1,
      iconClass: "fas fa-sun",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-orange-500",
      shadowColor: "shadow-yellow-500/30",
      cardBgFrom: "from-yellow-50",
      cardBgTo: "to-orange-50",
      borderClass: "border border-yellow-100",
      title: "सकाळची पाळी",
      timeStart: "6:00 AM",
      connector: "ते",
      timeEnd: "2:00 PM",
      badgeBg: "bg-yellow-100",
      badgeText: "text-yellow-800",
      badgeLabel: "8 तासांची पाळी",
      isPopular: false,
    },
    {
      id: 2,
      iconClass: "fas fa-cloud-sun",
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500",
      shadowColor: "shadow-blue-500/30",
      cardBgFrom: "from-blue-50",
      cardBgTo: "to-indigo-50",
      borderClass: "border border-blue-100",
      title: "दुपारची पाळी",
      timeStart: "2:00 PM",
      connector: "ते",
      timeEnd: "10:00 PM",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      badgeLabel: "8 तासांची पाळी",
      isPopular: false,
    },
    {
      id: 3,
      iconClass: "fas fa-infinity",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-500",
      shadowColor: "shadow-purple-500/30",
      cardBgFrom: "from-purple-50",
      cardBgTo: "to-pink-50",
      borderClass: "border-2 border-purple-200",
      title: "पूर्ण दिवस",
      timeStart: "24/7",
      connector: "कधीही या",
      timeEnd: "कधीही!",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-800",
      badgeLabel: "अमर्याद प्रवेश",
      isPopular: true,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-clock text-primary-600"></i>
            <span className="text-primary-700 text-sm font-semibold">
              वेळापत्रक
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
            अभ्यासिकेच्या <span className="gradient-text">वेळा</span>
          </h2>
        </div>

        {/* Schedule Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`card-hover bg-gradient-to-br ${schedule.cardBgFrom} ${schedule.cardBgTo} rounded-3xl p-8 text-center ${schedule.borderClass} relative`}
            >
              {/* Popular Badge */}
              {schedule.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  लोकप्रिय
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-20 h-20 bg-gradient-to-br ${schedule.gradientFrom} ${schedule.gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${schedule.shadowColor}`}
              >
                <i className={`${schedule.iconClass} text-white text-3xl`}></i>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-dark-800 mb-2">
                {schedule.title}
              </h3>

              {/* Time Start */}
              <div className="text-4xl font-black text-dark-900 my-4">
                {schedule.timeStart}
              </div>

              {/* Connector */}
              <div className="text-dark-500">{schedule.connector}</div>

              {/* Time End */}
              <div className="text-4xl font-black text-dark-900 my-4">
                {schedule.timeEnd}
              </div>

              {/* Badge */}
              <div
                className={`mt-4 ${schedule.badgeBg} ${schedule.badgeText} px-4 py-2 rounded-full text-sm font-bold inline-block`}
              >
                {schedule.badgeLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudyTime;