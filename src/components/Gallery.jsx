function Gallery() {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      alt: "गॅलरी 1",
      colSpan: "col-span-2",
      rowSpan: "row-span-2",
      imgHeight: "h-full",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=300&fit=crop",
      alt: "गॅलरी 2",
      colSpan: "",
      rowSpan: "",
      imgHeight: "h-48",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      alt: "गॅलरी 3",
      colSpan: "",
      rowSpan: "",
      imgHeight: "h-48",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop",
      alt: "गॅलरी 4",
      colSpan: "",
      rowSpan: "",
      imgHeight: "h-48",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop",
      alt: "गॅलरी 5",
      colSpan: "",
      rowSpan: "",
      imgHeight: "h-48",
    },
  ];

  return (
    <section className="py-24 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-images text-primary-600"></i>
            <span className="text-primary-700 text-sm font-semibold">
              गॅलरी
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6 relative inline-block line-decoration">
            आमची <span className="gradient-text">अभ्यासिका पहा</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`${image.colSpan} ${image.rowSpan} rounded-2xl overflow-hidden group`}
            >
              <img
                src={image.src}
                className={`w-full ${image.imgHeight} object-cover group-hover:scale-110 transition-transform duration-700`}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;