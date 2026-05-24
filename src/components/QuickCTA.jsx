function QuickCTA() {
  const ctaButtons = [
    {
      id: 1,
      href: "#booking",
      iconClass: "fas fa-bookmark",
      label: "आत्ताच बुक करा",
      className:
        "btn-premium bg-white text-primary-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all duration-300 flex items-center space-x-3",
    },
    {
      id: 2,
      href: "tel:+918208730007",
      iconClass: "fas fa-phone-alt",
      label: "कॉल करा",
      className:
        "bg-white/20 backdrop-blur text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-3 border border-white/30",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-accent relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
          आजच तुमचा अभ्यास सुरू करा आणि तुमचे स्वप्न साकार करा 🚀
        </h2>

        {/* Description */}
        {/* <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          पहिल्या 50 विद्यार्थ्यांना{" "}
          <span className="font-bold text-white">20% सवलत</span>! संधी गमावू
          नका — आत्ताच जागा आरक्षित करा.
        </p> */}

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {ctaButtons.map((button) => (
            <a
              key={button.id}
              href={button.href}
              className={button.className}
            >
              <i className={button.iconClass}></i>
              <span>{button.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickCTA;