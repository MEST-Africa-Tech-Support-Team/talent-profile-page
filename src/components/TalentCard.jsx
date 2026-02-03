export default function TalentCard({ name, role, image, onViewProfile, skills = [] }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 sm:mb-3 object-cover" // Added mb-3 for spacing
      />
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{name}</h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{role}</p> {/* Added mb-2 for spacing */}

      {/* Availability Status with Green Dot */}
      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3"> {/* Added mb-3 for spacing */}
        <span className="w-2 h-2 bg-[#00CA9B] rounded-full mr-1"></span>
        <span>Available - Full-time</span>
      </div>

      {/* Dynamic Skills/Tech Tags */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3"> {/* Added mb-4 for spacing */}
        {skills.map((skill, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>
      
      <button
        onClick={onViewProfile}
        // Adjusted button styling to better match the screenshot's teal/blue color
        className="mt-auto w-full sm:w-auto px-8 sm:px-12 py-2 text-xs sm:text-sm bg-primary-100 text-white rounded-xl hover:bg-[#239999] transition-colors font-medium cursor-pointer" 
      >
        View Profile
      </button>
    </div>
  );
}
