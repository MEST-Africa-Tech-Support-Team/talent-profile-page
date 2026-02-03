import { ExternalLink, FileDown, X } from "lucide-react";

export default function ViewTalentProfileModal({
  isOpen,
  onClose,
  talent,
  isLoading,
}) {
  if (!isOpen) return null;

  // Define colors
  const skillColors = [
    "#28bbbb", // primary green
    "#333333", // black
    "#b627a1", // purple
    "#ffbc45", // yellow
    "#ff6221", // orange
    "#00ca9b", // secondary green
    "#949494", // ash
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-4 sm:p-6 relative flex flex-col max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700 z-10 p-1"
        >
          <X size={20} />
        </button>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-8 sm:py-12">
            <p className="text-sm sm:text-base">Loading talent profile...</p>
          </div>
        ) : !talent ? (
          <div className="flex-1 flex items-center justify-center text-red-500 py-8 sm:py-12">
            <p className="text-sm sm:text-base">Failed to load talent profile.</p>
          </div>
        ) : (
          <>
            {/* Scrollable Content Container */}
            <div className="overflow-y-auto pr-2 sm:pr-4 flex-1">
              {/* Profile Header */}
              <div className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 sticky top-0 bg-white z-10 -mx-4 sm:-mx-6 px-4 sm:px-6">
                <img
                  src={talent.images[0]}
                  alt={talent.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    {talent.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-700">{talent.role}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-medium">Available</p>
                    <span className="bg-[#00CA9B] px-2 py-0.5 text-xs font-medium rounded-full text-white">
                      {talent.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-3 sm:mt-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  Brief Summary
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-secondary leading-relaxed whitespace-pre-line">
                  {talent.briefSummary}
                </p>
              </div>

              {/* Academic Background */}
              <div className="mt-3 sm:mt-4">
                <h3 className="text-sm sm:text-base font-semibold text-secondary">
                  Academic Background
                </h3>
                <div className="mt-2 space-y-3">
                  <div className="border-l-4 border-[#28bbbb] pl-3 py-1 bg-gray-50 rounded">
                    <p className="text-xs sm:text-sm font-medium text-secondary. whitespace-pre-line">
                      {talent.educationSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="mt-3 sm:mt-4">
                <h3 className="text-sm sm:text-base font-semibold text-secondary">
                  Soft Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {talent.softSkills.map((skill, idx) => {
                    const bgColor = skillColors[idx % skillColors.length]; // cycle through colors
                    return (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-full font-medium text-white"
                        style={{ backgroundColor: bgColor }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mt-3 sm:mt-4 mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-secondary">
                  Technical Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {talent.skills.map((skill, idx) => {
                    const bgColor = skillColors[idx % skillColors.length]; // cycle through colors
                    return (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-full font-medium text-white"
                        style={{ backgroundColor: bgColor }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Portfolio & CV Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:flex-wrap justify-between gap-2 sm:gap-3 border-t pt-3 sm:pt-4 sticky bottom-0 bg-white -mx-4 sm:-mx-6 px-4 sm:px-6">
              <a
                href={talent.portFolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm bg-primary-100 text-white rounded-lg hover:bg-[#239999] transition-colors"
              >
                <ExternalLink size={14} className="sm:w-4 sm:h-4" /> Portfolio
              </a>

              <a
                href={talent.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm bg-secondary text-white rounded-lg hover:bg-[#222] transition-colors"
              >
                <FileDown size={14} className="sm:w-4 sm:h-4" /> View CV
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdxhUctMBtgOUtREMGZR4OS164OM-EZFQYBHKEpVYM7Tw44TA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="grow sm:grow-0"
              >
                <button className="w-full px-3 py-2 text-xs sm:text-sm bg-[#949494] text-white rounded-lg cursor-pointer hover:bg-[#7a7a7a] transition-colors">
                  Hire Talent
                </button>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
