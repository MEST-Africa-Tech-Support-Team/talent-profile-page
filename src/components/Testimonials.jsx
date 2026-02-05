import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef({});

  // Sample testimonials data - replace with your actual data
  const testimonials = [
    {
      id: 1,
      videoUrl: 'https://res.cloudinary.com/dofmc4azg/video/upload/v1770225367/Elizabeth_Nuoma_Akossey_mk5lqh.mp4',
      quote: 'MEST transformed me from a curious beginner to a confident frontend developer. The hands-on projects and mentorship prepared me for real-world challenges.',
    },
   
  ];

  const handlePlayPause = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (isPlaying[id]) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying({ ...isPlaying, [id]: !isPlaying[id] });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
  const visible = [];
  const itemsToShow = Math.min(3, testimonials.length); // Don't show more than available
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visible.push({ ...testimonials[index], position: i });
  }
  return visible;
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
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${idx}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200/50">
                    {/* Video Section */}
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        ref={(el) => (videoRefs.current[`${testimonial.id}-${idx}`] = el)}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        playsInline
                        controlsList="nodownload"
                        onEnded={() => setIsPlaying({ ...isPlaying, [`${testimonial.id}-${idx}`]: false })}
                        onError={(e) => console.error('Video error:', e)}
                      >
                        <source src={testimonial.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Play/Pause Overlay */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying[`${testimonial.id}-${idx}`] ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                          }`}
                      >
                        <button
                          onClick={() => handlePlayPause(`${testimonial.id}-${idx}`)}
                          className="w-16 h-16 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                        >
                          {isPlaying[`${testimonial.id}-${idx}`] ? (
                            <Pause className="w-8 h-8 text-slate-900 ml-0.5" />
                          ) : (
                            <Play className="w-8 h-8 text-slate-900 ml-1" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Quote */}
                      <p className="text-slate-700 text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-white hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-white hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile View - Single Card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50">
                {/* Video Section */}
                <div className="relative aspect-video bg-slate-900">
                  <video
                    ref={(el) => (videoRefs.current[testimonials[currentIndex].id] = el)}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    controlsList="nodownload"
                    onEnded={() => setIsPlaying({ ...isPlaying, [testimonials[currentIndex].id]: false })}
                    onError={(e) => console.error('Video error:', e)}
                  >
                    <source src={testimonials[currentIndex].videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play/Pause Overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying[testimonials[currentIndex].id] ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                      }`}
                  >
                    <button
                      onClick={() => handlePlayPause(testimonials[currentIndex].id)}
                      className="w-16 h-16 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                    >
                      {isPlaying[testimonials[currentIndex].id] ? (
                        <Pause className="w-8 h-8 text-slate-900 ml-0.5" />
                      ) : (
                        <Play className="w-8 h-8 text-slate-900 ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Quote */}
                  <p className="text-slate-700 text-base leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-white active:bg-blue-600 text-slate-700 active:text-white rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-white active:bg-blue-600 text-slate-700 active:text-white rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
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
    </section>
  );
};

export default Testimonials;