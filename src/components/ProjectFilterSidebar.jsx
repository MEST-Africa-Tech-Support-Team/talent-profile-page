import { useState } from "react";
import { X, Search } from "lucide-react";

// Project type options based on the schema
const projectTypesList = [
  { value: 'PORTFOLIO_PERSONAL', label: 'Portfolio/Personal' },
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'FINTECH', label: 'Fintech' },
  { value: 'SAAS_PRODUCTIVITY', label: 'SaaS/Productivity' },
  { value: 'SOCIAL_COMMUNICATION', label: 'Social/Communication' },
  { value: 'ENTERTAINMENT_MEDIA', label: 'Entertainment/Media' },
  { value: 'EDTECH', label: 'EdTech' },
  { value: 'HEALTH_FITNESS', label: 'Health/Fitness' },
  { value: 'AI_MACHINE_LEARNING', label: 'AI/Machine Learning' },
  { value: 'WEB3_BLOCKCHAIN', label: 'Web3/Blockchain' },
  { value: 'UTILITIES_TOOLS', label: 'Utilities/Tools' },
  { value: 'OPEN_SOURCE', label: 'Open Source' },
  { value: 'ADVERTISEMENT', label: 'Advertisement' },
  { value: 'GAMING', label: 'Gaming' },
  { value: 'MARKERTING', label: 'Marketing' }
];

// Common tech stacks for filtering
const techStackList = [
  "React", "Node.js", "Python", "JavaScript", "TypeScript", 
  "MongoDB", "PostgreSQL", "MySQL", "Express", "Next.js",
  "Vue.js", "Angular", "Django", "Flask", "FastAPI",
  "GraphQL", "REST API", "Docker", "Kubernetes", "AWS",
  "Tailwind", "Bootstrap", "Material-UI", "Sass"
];

export default function ProjectFilterSidebar({ filters, setFilters, onClose }) {
  // Use a local state to manage changes before applying
  const [localFilters, setLocalFilters] = useState(filters);

  // Handle changes for multi-select (checkbox-style) filters
  const handleArrayChange = (filterKey, value) => {
    setLocalFilters((prev) => {
      const currentArray = prev[filterKey];
      if (currentArray.includes(value)) {
        return { ...prev, [filterKey]: currentArray.filter((item) => item !== value) };
      } else {
        return { ...prev, [filterKey]: [...currentArray, value] };
      }
    });
  };

  // Handle changes for single-select filters
  const handleSingleSelectChange = (filterKey, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey] === value ? null : value,
    }));
  };

  // Apply filters to the parent component's state
  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  // Clear all filters
  const handleClearAll = () => {
    const defaultFilters = {
      search: "",
      projectTypes: [],
      techStack: [],
    };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/30 backdrop-blur-sm bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 max-w-full bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Search within sidebar */}
        <div className="relative mt-4 sm:mt-6 mb-4 sm:mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={localFilters.search}
            onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
          />
        </div>

        {/* All Filter Sections */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6">
          {/* Project Type Filter Section */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-secondary dark:text-gray-200">Project Type</h3>
            <div className="flex flex-wrap gap-2">
              {projectTypesList.map((type) => (
                <span
                  key={type.value}
                  onClick={() => handleArrayChange("projectTypes", type.value)}
                  className={`cursor-pointer px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    localFilters.projectTypes.includes(type.value)
                      ? "bg-[#28bbbb] text-white"
                      : "bg-[#949494] text-white hover:bg-[#757575]"
                  }`}
                >
                  {type.label}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack Filter Section */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-secondary dark:text-gray-200">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStackList.map((tech) => (
                <span
                  key={tech}
                  onClick={() => handleArrayChange("techStack", tech)}
                  className={`cursor-pointer px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    localFilters.techStack.includes(tech)
                      ? "bg-[#28bbbb] text-white"
                      : "bg-[#949494] text-white hover:bg-[#757575]"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 sm:p-6 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
          <button onClick={handleClearAll} className="text-sm font-semibold text-[#ff6221] hover:underline cursor-pointer">
            Clear All
          </button>
          <button onClick={handleApplyFilters} className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg bg-[#28bbbb] text-white font-semibold cursor-pointer hover:bg-[#239999] transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
