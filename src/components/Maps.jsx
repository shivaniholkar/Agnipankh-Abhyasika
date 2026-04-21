function Maps() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68082829823!2d73.72287834726642!3d18.524598710498977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1smr!2sin!4v1700000000000!5m2!1smr!2sin";

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-900">
            <i className="fas fa-map-marked-alt text-primary-600 mr-2"></i>
            आम्हाला भेट द्या
          </h2>
          <p className="text-dark-500 mt-2">
            Google Maps वर आमचे स्थान शोधा
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <iframe
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="अग्निपंख अभ्यासिका - Google Maps स्थान"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Maps;