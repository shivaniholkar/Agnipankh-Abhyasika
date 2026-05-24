// import ScrollReveal from './ScrollReveal';
import about1 from "../assets/about1.jpg"
import about2 from "../assets/about2.jpg"

function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden animate-slide-up">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100/50 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Images & Stats */}
          {/* <ScrollReveal animation="slide-left"> */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={about1}
                    className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
                    alt="अभ्यासिका"
                  />
                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                    <div className="text-4xl font-black mb-1">5+</div>
                    <div className="text-primary-200 font-medium">वर्षांचा अनुभव</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gradient-to-br from-accent to-orange-600 rounded-2xl p-6 text-white">
                    <div className="text-4xl font-black mb-1">4.9★</div>
                    <div className="text-orange-200 font-medium">विद्यार्थी रेटिंग</div>
                  </div>
                  <img
                    src={about2}
                    className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
                    alt="अभ्यास कक्ष"
                  />
                </div>
              </div>

              {/* Center Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-full w-24 h-24 flex items-center justify-center z-10 animate-pulse-glow">
                <div className="text-center">
                  <i className="fas fa-award text-primary-600 text-2xl"></i>
                  <div className="text-xs font-bold text-dark-700 mt-1">#1 अभ्यासिका</div>
                </div>
              </div>
            </div>
          {/* </ScrollReveal> */}

          {/* Right Side - Content */}
          {/* <ScrollReveal animation="slide-right" delay={200}> */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-6">
                <i className="fas fa-info-circle text-primary-600"></i>
                <span className="text-primary-700 text-sm font-semibold">आमच्याबद्दल</span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 leading-tight">
                आदर्श अभ्यास कक्ष—
                <span className="gradient-text"> तुमची एकाग्रता हीच आमची शक्ती!</span> 
                
              </h2>

              {/* Description */}
              <p className="text-dark-600 text-lg leading-relaxed mb-8">
                <strong className="text-dark-800">अग्निपंख अभ्यासिका</strong> ही एक आधुनिक अभ्यासासाठीची जागा आहे जिथे
                फक्त शांत, आरामदायक आणि एकाग्रतेसाठी तयार केलेले
                वैयक्तिक अभ्यास कक्ष. प्रत्येक विद्यार्थ्याला स्वतःचे खाजगी स्थान मिळते
                जिथे तो/ती पूर्ण लक्ष केंद्रित करून अभ्यास करू शकतो/ते.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                    <i className="fas fa-volume-mute text-primary-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-800 text-lg">पूर्ण शांतता</h4>
                    <p className="text-dark-500">ध्वनिरोधक भिंती आणि शांत वातावरणाची हमी</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-orange-50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                    <i className="fas fa-user-shield text-accent text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-800 text-lg">वैयक्तिक डेस्क</h4>
                    <p className="text-dark-500">प्रत्येक विद्यार्थ्यासाठी स्वतंत्र खाजगी जागा</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <i className="fas fa-clock text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-800 text-lg">24 तास × 7 दिवस</h4>
                    <p className="text-dark-500">कधीही या, कधीही अभ्यास करा — कोणतीही वेळेची मर्यादा नाही</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#gallery"
                className="inline-flex items-center space-x-3 bg-dark-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-dark-800 transition-all duration-300 shadow-xl group"
              >
                <span>अभ्यास कक्ष पहा</span>
                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
              </a>
            </div>
          {/* </ScrollReveal> */}
        </div>
      </div>
    </section>
  );
}

export default About;