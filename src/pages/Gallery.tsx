
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";
import { Grid, Maximize, Play, X } from "lucide-react";

// Mock data for gallery images
const mockImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mystical Forest",
    description: "A dreamy forest scene with ethereal lighting",
    tags: ["nature", "forest", "mystical"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    title: "Cosmic Dreams",
    description: "Stars and galaxies in perfect harmony",
    tags: ["space", "cosmic", "dreams"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=600&fit=crop",
    title: "Ocean Whispers",
    description: "Waves meeting the shore in golden light",
    tags: ["ocean", "waves", "golden"]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mountain Majesty",
    description: "Peaks touching the clouds above",
    tags: ["mountains", "clouds", "majestic"]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    title: "Urban Fantasy",
    description: "City lights creating magic in the night",
    tags: ["urban", "lights", "fantasy"]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=600&fit=crop",
    title: "Desert Mirage",
    description: "Sand dunes under starlit skies",
    tags: ["desert", "stars", "mirage"]
  }
];

type ViewMode = 'grid' | 'fullscreen' | 'slideshow';

const Gallery = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedImage, setSelectedImage] = useState<typeof mockImages[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (image: typeof mockImages[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % mockImages.length);
    setSelectedImage(mockImages[(currentIndex + 1) % mockImages.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length);
    setSelectedImage(mockImages[(currentIndex - 1 + mockImages.length) % mockImages.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navigation />
      
      <div className="pt-24 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-serif text-white mb-4">Gallery</h1>
          <p className="text-white/70 text-lg">A collection of captured dreams</p>
        </motion.div>

        {/* View Mode Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('fullscreen')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'fullscreen' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <Maximize size={20} />
            </button>
            <button
              onClick={() => setViewMode('slideshow')}
              className={`p-3 rounded-full transition-all ${
                viewMode === 'slideshow' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <Play size={20} />
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {mockImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              className="group cursor-pointer"
              onClick={() => openModal(image, index)}
            >
              <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.description}</p>
                </div>
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ 
                       background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
                       animation: "ripple 0.6s ease-out"
                     }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 text-white">
                <h2 className="text-2xl font-serif mb-2">{selectedImage.title}</h2>
                <p className="text-white/80 mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
