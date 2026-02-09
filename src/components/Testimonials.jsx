import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sample testimonials data - replace with your actual data
  const testimonials = [
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=f7DNBFqk2yI',
      quote: 'MEST transformed me from a curious beginner to a confident frontend developer. The hands-on projects and mentorship prepared me for real-world challenges.',
    },
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=f7DNBFqk2yI',
      quote: 'MEST transformed me from a curious beginner to a confident frontend developer. The hands-on projects and mentorship prepared me for real-world challenges.',
    },
    {
      id: 1,
      videoUrl: 'https://www.youtube.com/watch?v=f7DNBFqk2yI',
      quote: 'MEST transformed me from a curious beginner to a confident frontend developer. The hands-on projects and mentorship prepared me for real-world challenges.',
    },
 
   
  ];

  // Extract YouTube video ID from URL
  const getYouTubeThumbnail = (url) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const openVideoModal = (testimonial) => {
    setSelectedVideo(testimonial);
  };

  

  return (
    <section className="relative py-20 px-4 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Success Stories</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our Talented Developers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the journeys of MEST developers who transformed their careers through our intensive program
          </p>
        </motion.div>

        {/* Desktop View - Grid Layout */}
      

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                {/* YouTube Thumbnail */}
                <img 
                  src={getYouTubeThumbnail(testimonial.videoUrl)} 
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => openVideoModal(testimonial)}
                    className="relative z-10 w-16 h-16 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 group-hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 text-blue-600 fill-blue-600 ml-1" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Quote */}
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed line-clamp-4">
                  "{testimonial.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'MEST Graduates', value: '1,200+' },
            { label: 'Projects Built', value: '5,000+' },
            { label: 'Employment Rate', value: '95%' },
            { label: 'Companies Hiring', value: '500+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div> */}
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        videoUrl={selectedVideo?.videoUrl}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default Testimonials;