export default function Banner() {
  return (
    <section className="bg-[#28BBBB] text-white px-4 sm:px-6 md:px-10 py-8 text-center min-h-[50vh] flex flex-col justify-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-bold mt-6 leading-snug">
        Discover Africa's Brightest <br className="hidden sm:block" /> Tech
        Talent
      </h1>

      <p className="mt-2 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        Connect with skilled professionals ready to transform your projects and{" "}
        <br className="hidden sm:block" /> drive innovation forward
      </p>

      <div>
        <button className="bg-white hover:bg-gray-100 text-[#28BBBB] font-bold py-2 px-6 rounded-lg shadow-lg transition-colors mt-6 duration-300 cursor-pointer">
          Hire Talents
        </button>
      </div>
    </section>
  );
}