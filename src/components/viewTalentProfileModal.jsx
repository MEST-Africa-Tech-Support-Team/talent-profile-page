import {ExternalLink, FileDown, X} from "lucide-react";

export default function ViewTalentProfileModal({isOpen, onClose, talent, isLoading}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-6 relative flex flex-col h-[90%] md:h-[80%]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
                >
                    <X size={20}/>
                </button>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p>Loading talent profile...</p>
                    </div>
                ) : !talent ? (
                    <div className="flex-1 flex items-center justify-center text-red-500">
                        <p>Failed to load talent profile.</p>
                    </div>
                ) : (
                    <>
                        {/* Scrollable Content Container */}
                        <div className="overflow-y-auto pr-4 flex-1">
                            {/* Profile Header */}
                            <div
                                className="flex items-center gap-4 border-b pb-4 sticky top-0 bg-white z-10 -mx-6 px-6">
                                <img
                                    src={talent.images[0]}
                                    alt={talent.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {talent.name}
                                    </h2>
                                    <p className="text-sm text-gray-700">{talent.role}</p>
                                    <p className="text-xs text-teal-600 font-medium">
                                        {talent.availability}
                                    </p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mt-4">
                                <h3 className="text-base font-semibold text-gray-900">Brief Summary</h3>
                                <p className="mt-1 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                    {talent.briefSummary}
                                </p>
                            </div>

                            {/* Academic Background */}
                            <div className="mt-4">
                                <h3 className="text-base font-semibold text-gray-900">Academic Background</h3>
                                <div className="mt-2 space-y-3">
                                    <div className="border-l-4 border-teal-500 pl-3 py-1 bg-gray-50 rounded">
                                        <p className="text-sm font-medium text-gray-800 whitespace-pre-line">
                                            {talent.educationSummary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Soft Skills */}
                            <div className="mt-4">
                                <h3 className="text-base font-semibold text-gray-900">Soft Skills</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {talent.softSkills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full font-medium"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Skills */}
                            <div className="mt-4">
                                <h3 className="text-base font-semibold text-gray-900">Technical Skills</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {talent.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-full font-medium"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Portfolio & CV Buttons */}
                        <div
                            className="mt-6 flex flex-wrap justify-between gap-3 border-t pt-4 sticky bottom-0 bg-white -mx-6 px-6">
                            <a
                                href={talent.portFolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                <ExternalLink size={16}/> Portfolio
                            </a>

                            <a
                                href={talent.cv}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                <FileDown size={16}/> View CV
                            </a>

                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdxhUctMBtgOUtREMGZR4OS164OM-EZFQYBHKEpVYM7Tw44TA/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button
                                    className="flex-grow md:flex-grow-0 px-3 py-2 text-sm bg-[var(--color-accent)] text-white rounded-lg hover:bg-green-700">
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