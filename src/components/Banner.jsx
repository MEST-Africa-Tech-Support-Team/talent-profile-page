export default function Banner() {
  return (
    <section className="bg-teal-500 text-white p-10 text-center h-80 flex flex-col justify-center">
      <h1 className="text-5xl mb-4 font-bold mt-6">Discover Africa's Brightest <br />Tech Talent</h1>

      <p className="mt-2 text-md">Connect with skilled professionals ready to transform your projects and <br />drive innovation forward</p>

      <div>
        <button class="bg-white hover:bg-gray-300 text-teal-500 font-bold py-2 px-6 rounded-lg shadow-lg transition-colors mt-6 duration-300">
        Hire Talents
      </button>
      </div>
    </section>
  );
}
