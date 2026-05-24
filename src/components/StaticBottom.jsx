import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg'


function StaticBottom() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      id: 1,
      href: "#",
      iconClass: "fab fa-facebook-f",
      hoverBg: "hover:bg-blue-600",
    },
    {
      id: 2,
      href: "#",
      iconClass: "fab fa-instagram",
      hoverBg: "hover:bg-pink-600",
    },
    {
      id: 3,
      href: "https://wa.me/7887975427",
      iconClass: "fab fa-whatsapp",
      hoverBg: "hover:bg-green-600",
    },
    {
      id: 4,
      href: "#",
      iconClass: "fab fa-youtube",
      hoverBg: "hover:bg-red-600",
    },
  ];

  const quickLinks = [
    { id: 1, href: "#home", label: "मुख्यपृष्ठ" },
    { id: 2, href: "#about", label: "आमच्याबद्दल" },
    { id: 3, href: "#features", label: "सुविधा" },
    { id: 4, href: "#pricing", label: "दरपत्रक" },
    { id: 5, href: "#gallery", label: "गॅलरी" },
    { id: 6, href: "#booking", label: "नोंदणी" },
  ];

  const services = [
    { id: 1, href: "#features", label: "हाय-स्पीड WiFi" },
    { id: 2, href: "#features", label: "वातानुकूलित कक्ष" },
    { id: 3, href: "#features", label: "पॉवर आउटलेट" },
    { id: 4, href: "#features", label: "CCTV सुरक्षा" },
    { id: 5, href: "#features", label: "स्वच्छ शौचालय" },
  ];

  const contactInfo = [
    {
      id: 1,
      iconClass: "fas fa-map-marker-alt",
      type: "text",
      content: (
        <>
          फोरप्राईड कॉम्प्लेक्स, जळोची रोड, सूर्यनगरी, M.I.D.C.
          <br />बारामती - 413102
        </>
      ),
    },
    {
      id: 2,
      iconClass: "fas fa-phone-alt",
      type: "link",
      href: "tel:+918208730007",
      content: "+91 8208730007",
    },
    {
      id: 3,
      iconClass: "fas fa-envelope",
      type: "link",
      href: "mailto:agnipankhabhyasika2022@gmail.com",
      content: "agnipankhabhyasika2022@gmail.com",
    },
    {
      id: 4,
      iconClass: "fas fa-clock",
      type: "text",
      content: "24/7 उपलब्ध",
    },
  ];

  const bottomLinks = [
    { id: 1, href: "#", label: "गोपनीयता धोरण" },
    { id: 2, href: "#", label: "अटी व शर्ती" },
    { id: 3, href: "#", label: "रिफंड धोरण" },
  ];

  return (
    <>
      {/* Footer */}
      <footer className="hero-gradient pt-20 pb-8 relative overflow-hidden">
        {/* Background Line */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg overflow-hidden">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="relative mt-2">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-primary-400 tracking-wider">
                      अग्निपंख
                    </span>
                  </div>

                  <span className="text-md uppercase tracking-[0.1em] text-primary-400 font-bold opacity-80 group-hover:text-white transition-colors -mt-1">
                    अभ्यासिका
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                शांत वातावरण, आधुनिक सुविधा आणि तुमच्या यशाची साथ —
                अग्निपंख अभ्यासिका.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center ${social.hoverBg} transition-colors`}
                  >
                    <i className={`${social.iconClass} text-white`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">
                झटपट लिंक्स
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <i className="fas fa-chevron-right text-xs text-primary-500"></i>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">सेवा</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <i className="fas fa-chevron-right text-xs text-primary-500"></i>
                      <span>{service.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">संपर्क</h4>
              <ul className="space-y-4">
                {contactInfo.map((info) => (
                  <li
                    key={info.id}
                    className={`flex ${info.type === "text" ? "items-start" : "items-center"
                      } space-x-3`}
                  >
                    <i
                      className={`${info.iconClass} text-primary-400 ${info.type === "text" ? "mt-1" : ""
                        }`}
                    ></i>
                    {info.type === "link" ? (
                      <a
                        href={info.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <span className="text-gray-400">{info.content}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} अग्निपंख अभ्यासिका. सर्व हक्क
                राखीव.{" "}
                {/* <span className="text-gray-600">❤️</span> प्रेमाने बनवलेले. */}
              </p>

              {/* Bottom Links */}
              <div className="flex items-center space-x-6 text-sm">
                {/* {bottomLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))} */}
                <p className="text-gray-500 text-sm text-center md:text-left">
                Developed by {" "}
                <span className="text-orange-600">Shivani</span>
              </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full shadow-2xl shadow-primary-600/40 flex items-center justify-center z-50 transition-all duration-300 hover:from-primary-700 hover:to-primary-600 cursor-pointer ${showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up text-lg"></i>
      </button>
    </>
  );
}

export default StaticBottom;