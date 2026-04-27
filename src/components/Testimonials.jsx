import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = [
    {
      id: 1,
      videoUrl:
        "https://www.youtube.com/watch?v=gt36jujLAPc&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=1&pp=iAQB",
      quote:
        "Kasia is a Frontend Developer and problem-solver with strong business acumen. Her background in logistics and project management brings an analytical, detail-oriented approach to her work. Skilled in React, Tailwind, HTML, CSS, JavaScript, GitHub, and UI/UX, she delivers quality results that balance technical execution with strategic thinking.",
    },
    {
      id: 2,
      videoUrl:
        "https://www.youtube.com/watch?v=3EHzBOWwdeo&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=3",
      quote:
        "With a background in Actuarial Science and experience as a Data Analyst, Elizabeth Sampong transitioned into tech to build solutions that create real impact. Trained as a Backend Developer, she also excels in Frontend development, working with Node.js, React, MongoDB, and Next.js on real-world projects.",
    },
    {
      id: 3,
      videoUrl:
        "https://www.youtube.com/watch?v=yCu4hDLzwKQ&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=4",
      quote:
        "Beyond his backend development expertise, Alpheaus Gberbie possesses valuable skills in marketing and sales, giving him a unique perspective that bridges technical execution with business strategy.",
    },
    {
      id: 4,
      videoUrl:
        "https://www.youtube.com/watch?v=wNZCVfOw_8w&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=5",
      quote:
        "Kweku Agyeman-Gyebi confidently positions himself as a junior web developer with creativity at the core of his work; an edge that enables him to deliver solutions that stand out.",
    },
    {
      id: 5,
      videoUrl:
        "https://www.youtube.com/watch?v=KcFSlDrzuew&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=6",
      quote:
        "Joyce Abbey is a Web Developer with hands-on experience in React, HTML, Tailwind CSS, Node.js, and GitHub. She has applied her skills to real-world projects, including building functional apps from scratch.",
    },
    {
      id: 6,
      videoUrl:
        "https://www.youtube.com/watch?v=jH8gZOc7qMA&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=6",
      quote:
        "Israel is a strong team player with a solid grasp of front-end and back-end development and a careful, analytical approach to problem-solving.",
    },
    {
      id: 7,
      videoUrl:
        "https://www.youtube.com/watch?v=p-Rzki_B0x0&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=7",
      quote:
        "Emmanuella Bayor brings a unique combination of technical skill, clear communication, and a strong growth mindset to any frontend development role. She has hands-on experience with HTML, CSS, Python (GUI), JavaScript, and GitHub.",
    },
    {
      id: 8,
      videoUrl:
        "https://www.youtube.com/watch?v=GDvlxt46vJo&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=8",
      quote:
        "Christian Kofi Appiah genuinely enjoys solving problems with technology. He's worked across different tools and frameworks like React, Next.js, Angular, Flutter, PHP, and he picks up new technologies quickly because he's constantly curious and eager to learn.",
    },
    {
      id: 9,
      videoUrl:
        "https://www.youtube.com/watch?v=_uX3RzqfUS0&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=9",
      quote:
        "Elizabeth Nuoma Akossey is a Frontend Web Developer with a healthcare background who brings strong adaptability, user-centred thinking, and fast learning into every project. She has hands-on experience building real products, including a blood-matching platform that uses geolocation to connect donors to hospitals where clarity, usability, and speed were critical.",
    },
    {
      id: 10,
      videoUrl:
        "https://www.youtube.com/watch?v=Q8YLdQkSbXc&list=PLuhCeKxr95f_t_MPARoUF4THeLxQIwXuB&index=10",
      quote:
        "Claudia Agyeere is a Backend–focused Web Developer with a strong foundation in health and nutrition, making her especially valuable for teams working in healthtech, data-driven systems, or impact-focused products.",
    },
  ];

  const getYouTubeThumbnail = (url) => {
    const videoId = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/,
    )?.[1];
    return videoId
      ? {
          videoId,
          src: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        }
      : null;
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Some Of Our Talented Developers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the journeys of MEST developers who transformed their
            careers through our intensive program
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const thumb = getYouTubeThumbnail(testimonial.videoUrl);
            return (
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
                  {thumb && (
                    <img
                      src={thumb.src}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${thumb.videoId}/hqdefault.jpg`;
                        e.target.onerror = null;
                      }}
                    />
                  )}
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
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
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
