import { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg'

function StaticTop() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 1, href: "#home", label: "मुख्यपृष्ठ" },
    { id: 2, href: "#about", label: "आमच्याबद्दल" },
    { id: 3, href: "#features", label: "सुविधा" },
    { id: 4, href: "#pricing", label: "दरपत्रक" },
    { id: 5, href: "#gallery", label: "गॅलरी" },
    { id: 6, href: "#testimonials", label: "अभिप्राय" },
    { id: 7, href: "#contact", label: "संपर्क" },
  ];

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise"></div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? "bg-dark-900/90 backdrop-blur-xl shadow-2xl"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 group">
              <div className="w-12 h-12  flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg overflow-hidden">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-12 h-12 object-cover  rounded-xl"
                />
              </div>
              {/* <div>
                <span className="text-2xl font-bold text-white tracking-tight mt-2">
                  अग्निपंख
                </span>
                <span className="block text-lg text-primary-300 -mt-1 font-medium">
                  अभ्यासिका
                </span>
              </div> */}
              <div className="flex flex-col justify-center">
                <div className="relative mt-2">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-primary-400 tracking-wider">
                    अग्निपंख
                  </span>  
                </div>
                <span className="text-md uppercase tracking-[0.1em] text-primary-400 font-bold opacity-80 group-hover:text-white transition-colors">
                  अभ्यासिका
                </span>
              </div>
            </a>


            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="nav-link px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300 text-md font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:+919876543210"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <span className="text-md">+91 8208730007</span>
              </a>
              <a
                href="#booking"
                className="btn-premium bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-xl text-md font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-600/30"
              >
                आत्ताच बुक करा
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <i
                className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"
                  } text-xl transition-transform duration-300`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden glass border-t border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA Button */}
            <a
              href="#booking"
              onClick={handleLinkClick}
              className="block px-4 py-3 mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center rounded-xl font-semibold"
            >
              आत्ताच बुक करा
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default StaticTop;