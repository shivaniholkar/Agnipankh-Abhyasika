import mayur from "../assets/Mayur.jpeg"
import harsh from "../assets/Harsh.jpeg"


function OwnerDetails() {
  const owners = [
    {
      name: 'ॲड. मयुर सातव',
      role: 'संस्थापक & व्यवस्थापकीय संचालक',
      phone: '+91 9359080053',
      email: 'mayursatav0302@gmail.com',
      whatsapp: '919637167210',
      image: mayur,
      experience: '5+ वर्षांचा अनुभव',
      qualification: 'BALLB, पुणे विद्यापीठ',
      quote: 'विद्यार्थ्यांना उत्तम अभ्यासाचे वातावरण देणे हे आमचे ध्येय आहे.',
      color: 'primary',
    },
    {
      name: 'ॲड. हर्ष कर्चे',
      role: 'सह-संस्थापक & संचालक',
      phone: '+91 8208730007',
      email: 'harshkarche0007@gmail.com',
      whatsapp: '917887975427',
      image: harsh,
      experience: '5+ वर्षांचा अनुभव',
      qualification: 'BSC LLB, पुणे विद्यापीठ',
      quote: 'प्रत्येक विद्यार्थ्याच्या यशात आमचे यश सामावलेले आहे.',
      color: 'accent',
    },
  ];

  const colorMap = {
    primary: {
      badge: 'bg-primary-50 text-primary-700 border-primary-200',
      iconBg: 'bg-primary-100',
      iconText: 'text-primary-600',
      ring: 'ring-primary-200',
      gradient: 'from-primary-600 to-primary-500',
      hoverGradient: 'hover:from-primary-700 hover:to-primary-600',
      shadow: 'shadow-primary-600/20',
      quoteBg: 'bg-primary-50 border-primary-100',
      quoteIcon: 'text-primary-300',
      accentLine: 'from-primary-500 to-primary-300',
      tagBg: 'bg-primary-50 text-primary-700',
    },
    accent: {
      badge: 'bg-orange-50 text-orange-700 border-orange-200',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-600',
      ring: 'ring-orange-200',
      gradient: 'from-orange-600 to-orange-500',
      hoverGradient: 'hover:from-orange-700 hover:to-orange-600',
      shadow: 'shadow-orange-600/20',
      quoteBg: 'bg-orange-50 border-orange-100',
      quoteIcon: 'text-orange-300',
      accentLine: 'from-orange-500 to-orange-300',
      tagBg: 'bg-orange-50 text-orange-700',
    },
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 30%, #f1f3f5 60%, #f8f9fa 100%)',
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 px-4 py-2 rounded-full mb-5">
            <i className="fas fa-users text-primary-600 text-sm"></i>
            <span className="text-primary-700 text-sm font-semibold">
              आमची टीम
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-dark-900 mb-4">
            संस्थापक &{' '}
            <span className="gradient-gold">व्यवस्थापन</span>
          </h2>
          <p className="text-dark-500 text-base max-w-xl mx-auto">
            अग्निपंख अभ्यासिकेच्या यशामागील प्रेरणादायी व्यक्ती
          </p>
        </div>

        {/* Owner Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {owners.map((owner, index) => {
            const c = colorMap[owner.color];

            return (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl border border-dark-200 rounded-3xl overflow-hidden shadow-lg shadow-dark-900/5 hover:shadow-2xl hover:shadow-dark-900/10 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Accent Top Line */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${c.accentLine}`}
                ></div>

                <div className="p-7">

                  {/* Profile Header */}
                  <div className="flex items-center space-x-5 mb-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-24 h-24 rounded-2xl overflow-hidden ring-3 ${c.ring} shadow-lg group-hover:scale-105 transition-transform duration-500`}
                      >
                        <img
                          src={owner.image}
                          alt={owner.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online indicator */}
                      {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
                        <i className="fas fa-check text-white text-[8px]"></i>
                      </div> */}
                    </div>

                    {/* Name & Role */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-dark-900 mb-1 truncate">
                        {owner.name}
                      </h3>
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}
                      >
                        <i className="fas fa-crown mr-1.5 text-[10px]"></i>
                        {owner.role}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span
                      className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg ${c.tagBg}`}
                    >
                      <i className="fas fa-briefcase mr-1.5 text-[10px]"></i>
                      {owner.experience}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-dark-100 text-dark-700">
                      <i className="fas fa-graduation-cap mr-1.5 text-[10px]"></i>
                      {owner.qualification}
                    </span>
                  </div>

                  {/* Quote */}
                  <div
                    className={`${c.quoteBg} border rounded-xl p-4 mb-6`}
                  >
                    <div className="flex items-start space-x-2">
                      <i
                        className={`fas fa-quote-left ${c.quoteIcon} mt-0.5 text-lg`}
                      ></i>
                      <p className="text-dark-600 text-sm italic leading-relaxed">
                        {owner.quote}
                      </p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 mb-6">
                    <a
                      href={`tel:${owner.phone.replace(/\s/g, '')}`}
                      className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-dark-50 transition-colors group/item"
                    >
                      <div
                        className={`w-9 h-9 ${c.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <i
                          className={`fas fa-phone-alt ${c.iconText} text-sm`}
                        ></i>
                      </div>
                      <div>
                        <div className="text-[11px] text-dark-400 font-medium uppercase tracking-wide">
                          फोन
                        </div>
                        <div className="text-dark-800 font-semibold text-sm group-hover/item:text-dark-900">
                          {owner.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${owner.email}`}
                      className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-dark-50 transition-colors group/item"
                    >
                      <div
                        className={`w-9 h-9 ${c.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <i
                          className={`fas fa-envelope ${c.iconText} text-sm`}
                        ></i>
                      </div>
                      <div>
                        <div className="text-[11px] text-dark-400 font-medium uppercase tracking-wide">
                          ईमेल
                        </div>
                        <div className="text-dark-800 font-semibold text-sm group-hover/item:text-dark-900">
                          {owner.email}
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={`tel:${owner.phone.replace(/\s/g, '')}`}
                      className={`flex-1 bg-gradient-to-r ${c.gradient} ${c.hoverGradient} text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${c.shadow} btn-premium`}
                    >
                      <i className="fas fa-phone-alt text-xs"></i>
                      <span>कॉल करा</span>
                    </a>
                    <a
                      href={`https://wa.me/${owner.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 bg-white/80 backdrop-blur-xl border border-dark-200 rounded-2xl p-6 shadow-lg shadow-dark-900/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shadow-sm">
                <i className="fas fa-headset text-primary-600 text-xl"></i>
              </div>
              <div>
                <h4 className="text-dark-900 font-bold text-base">
                  काही प्रश्न आहेत का?
                </h4>
                <p className="text-dark-500 text-sm">
                  आम्ही सोमवार ते शनिवार सकाळी 9 ते रात्री 9 वाजेपर्यंत उपलब्ध आहोत
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-primary-800 hover:to-primary-700 transition-all shadow-lg shadow-primary-600/20 btn-premium"
              >
                <i className="fas fa-phone-alt text-xs"></i>
                <span>आत्ता कॉल करा</span>
              </a>
              <a
                href="https://wa.me/7887975427"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
              >
                <i className="fab fa-whatsapp"></i>
                <span>संदेश पाठवा</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerDetails;