import React from 'react';

export default function TalentPagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  // Generate an array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-6 sm:my-8 px-4">
      <nav className="flex items-center space-x-1 sm:space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>

        {/* Page numbers mapping */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto max-w-[200px] sm:max-w-none">
          {pages.map((page) => (
            <button
              key={page} // The key is the unique page number
              onClick={() => onPageChange(page)}
              className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer flex-shrink-0 ${
                currentPage === page
                  ? "bg-[#28BBBB] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
