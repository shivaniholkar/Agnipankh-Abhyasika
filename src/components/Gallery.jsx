import { useEffect, useState } from "react";

// Import all 20 images from assets folder
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import img11 from "../assets/img11.jpeg";
import img12 from "../assets/img12.jpeg";
import img13 from "../assets/img13.jpeg";
import img14 from "../assets/img14.jpeg";
import img15 from "../assets/img15.jpeg";
import img16 from "../assets/img16.jpeg";
import img17 from "../assets/img17.jpeg";
import img18 from "../assets/img18.jpeg";
// import img19 from "../assets/img19.jpeg";
// import img20 from "../assets/img20.jpeg";

const galleryImages = [
  { id: 1, src: img1, alt: "गॅलरी 1" },
  { id: 2, src: img2, alt: "गॅलरी 2" },
  { id: 3, src: img3, alt: "गॅलरी 3" },
  { id: 4, src: img4, alt: "गॅलरी 4" },
  { id: 5, src: img5, alt: "गॅलरी 5" },
  { id: 6, src: img6, alt: "गॅलरी 6" },
  { id: 7, src: img7, alt: "गॅलरी 7" },
  { id: 8, src: img8, alt: "गॅलरी 8" },
  { id: 9, src: img9, alt: "गॅलरी 9" },
  { id: 10, src: img10, alt: "गॅलरी 10" },
  { id: 11, src: img11, alt: "गॅलरी 11" },
  { id: 12, src: img12, alt: "गॅलरी 12" },
  { id: 13, src: img13, alt: "गॅलरी 13" },
  { id: 14, src: img14, alt: "गॅलरी 14" },
  { id: 15, src: img15, alt: "गॅलरी 15" },
  { id: 16, src: img16, alt: "गॅलरी 16" },
  { id: 17, src: img17, alt: "गॅलरी 17" },
  { id: 18, src: img18, alt: "गॅलरी 18" },
  // { id: 19, src: img19, alt: "गॅलरी 19" },
  // { id: 20, src: img20, alt: "गॅलरी 20" },
];

function Gallery() {
  const imagesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = galleryImages.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrev = () => {
    if (selectedIndex === null) return;
    const newIndex =
      selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setCurrentPage(Math.floor(newIndex / imagesPerPage) + 1);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    const newIndex =
      selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setCurrentPage(Math.floor(newIndex / imagesPerPage) + 1);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" className="py-24 bg-gray-200">
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

        {/* Gallery Grid - 4 per row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentImages.map((image, index) => (
            <div
              key={image.id}
              className="rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => openLightbox(startIndex + index)}
            >
              <img
                src={image.src}
                className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                alt={image.alt}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            ◀ मागील
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg font-semibold transition ${
                currentPage === index + 1
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            पुढील ▶
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl leading-none hover:scale-110 transition z-10"
          >
            &times;
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 md:left-8 text-white text-4xl bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition"
          >
            &#10094;
          </button>

          {/* Full Image */}
          <div
            className="relative max-w-6xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 md:right-8 text-white text-4xl bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;