import hero from "../assets/hero.jpg"

function Home() {
  const particles = [
    { top: "20%", left: "15%", delay: "0s", duration: "5s" },
    { top: "40%", left: "75%", delay: "1s", duration: "4s" },
    { top: "60%", left: "25%", delay: "2s", duration: "6s" },
    { top: "30%", left: "85%", delay: "0.5s", duration: "5.5s" },
    { top: "70%", left: "60%", delay: "1.5s", duration: "4.5s" },
    { top: "15%", left: "50%", delay: "3s", duration: "7s" },
  ];

  const stats = [
    { value: "500+", label: "यशस्वी विद्यार्थी" },
    { value: "85+", label: "सीट्स" },
    { value: "24/7", label: "उपलब्धता" },
  ];

  const floatingBadges = [
    {
      id: 1,
      position: "absolute -top-6 -right-6",
      animationClass: "animate-float",
      iconClass: "fas fa-wifi",
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      title: "हाय-स्पीड WiFi",
      subtitle: "100 Mbps",
    },
    {
      id: 2,
      position: "absolute -bottom-6 -left-6",
      animationClass: "animate-float-slow",
      iconClass: "fas fa-snowflake",
      iconColor: "text-primary-400",
      iconBg: "bg-primary-500/20",
      title: "वातानुकूलित",
      subtitle: "पूर्ण AC",
    },
  ];

  return (
    <section
      id="home"
      className="hero-gradient min-h-screen flex items-center relative overflow-hidden py-20"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {/* Blur Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float-slow"></div>

        {/* Rotating Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full rotate-slow"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full rotate-slow"
          style={{ animationDirection: "reverse", animationDuration: "25s" }}
        ></div>

        {/* Particles */}
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text Content */}
          <div className="animate-slide-up">

            {/* Available Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-300 text-sm font-medium">
                जागा उपलब्ध आहेत • आजच नोंदणी करा
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 text-shadow">
              तुमच्या
              <span className="gradient-text"> यशाची</span>
              <br />
              सुरुवात इथूनच
              <span className="relative inline-block">
                {" "}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="url(#grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#4263eb" />
                      <stop offset="1" stopColor="#e8590c" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              होते
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
               
              <span className="text-white font-semibold">
                शांतता आणि एकाग्रता
              </span>
              . आधुनिक अभ्यास कक्ष, वातानुकूलित वातावरण आणि ध्यानपूर्ण शांतता
              — तुमच्या स्वप्नांच्या परीक्षेची आत्तापासूनच तयारी करा{" "}
              <span className="text-primary-400 font-semibold">
                अग्निपंख अभ्यासिकेत
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#booking"
                className="btn-premium group bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-primary-600/30 hover:shadow-primary-600/50 transition-all duration-300 flex items-center space-x-3"
              >
                <span>आत्ताच जागा बुक करा</span>
                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
              </a>
              <a
                href="#about"
                className="group glass text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/15 transition-all duration-300 flex items-center space-x-3"
              >
                <i className="fas fa-play-circle text-primary-400"></i>
                <span>अधिक जाणून घ्या</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center glass rounded-2xl p-4">
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image & Floating Badges */}
          <div className="hidden lg:block animate-float relative">
            <div className="relative">

              {/* Main Image */}
              <div className="glass rounded-3xl p-2 shadow-2xl">
                <img
                  src={hero}
                  alt="अग्निपंख अभ्यासिका"
                  className="rounded-2xl w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating Info Badges */}
              {floatingBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`${badge.position} ${badge.animationClass} glass rounded-2xl p-4 shadow-xl`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${badge.iconBg} rounded-xl flex items-center justify-center`}>
                      <i className={`${badge.iconClass} ${badge.iconColor} text-xl`}></i>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{badge.title}</div>
                      <div className="text-gray-400 text-xs">{badge.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Active Students Badge */}
              <div
                className="absolute top-1/2 -right-10 glass rounded-2xl p-4 shadow-xl"
                style={{
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[
                      {
                        label: "अ",
                        gradient: "from-primary-400 to-primary-600",
                      },
                      { label: "ब", gradient: "from-orange-400 to-accent" },
                      { label: "क", gradient: "from-green-400 to-green-600" },
                    ].map((avatar, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 bg-gradient-to-br ${avatar.gradient} rounded-full border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {avatar.label}
                      </div>
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">
                    90+ सध्या अभ्यासरत
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="text-white/50 hover:text-white transition-colors"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
}

export default Home;