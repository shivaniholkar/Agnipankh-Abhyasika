function MarqueeBanner() {
  const marqueeItems = [
    { id: 1, label: "UPSC तयारी" },
    { id: 2, label: "MPSC तयारी" },
    { id: 3, label: "JEE/NEET" },
    { id: 4, label: "बँकिंग परीक्षा" },
    { id: 5, label: "SSC" },
    { id: 6, label: "कॉलेज अभ्यास" },
    { id: 7, label: "CA/CS" },
    { id: 8, label: "पोलीस भरती" },
  ];

  return (
    <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent py-4 overflow-hidden">
      <div className="marquee-track animate-marquee">

        {/* Rendered twice for seamless infinite loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center space-x-12 whitespace-nowrap px-6"
          >
            {marqueeItems.map((item) => (
              <span
                key={item.id}
                className="text-white font-bold text-lg flex items-center"
              >
                <i className="fas fa-star text-gold-400 mr-2"></i>
                {item.label}
              </span>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}

export default MarqueeBanner;