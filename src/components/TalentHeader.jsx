import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

// TalentHeader now accepts filters and setFilters as props from its parent
export default function TalentHeader({ filters, setFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // We manage the search field type locally for the dropdown
  const [searchField, setSearchField] = useState(filters.searchField || "name");

  // This effect synchronizes the local searchField state with the parent's filters state
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchField }));
  }, [searchField, setFilters]);

  // Handler for the main search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const activeFilterChips = Object.entries(filters).flatMap(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      return value.map(val => ({ key: key, value: val }));
    }
    // Check for a value that is not the search string or searchField
    if (value && key !== "search" && key !== "searchField") {
      return [{ key: key, value: value }];
    }
    return [];
  });

  const removeFilter = (filterKey, valueToRemove) => {
    setFilters((prevFilters) => {
      if (Array.isArray(prevFilters[filterKey])) {
        return {
          ...prevFilters,
          [filterKey]: prevFilters[filterKey].filter((val) => val !== valueToRemove),
        };
      }
      return {
        ...prevFilters,
        [filterKey]: null,
      };
    });
  };

  return (
    <header className="w-full bg-[#28BBBB] font-[var(--font-heading)] px-4 py-4 sm:px-6 sm:py-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1 min-w-full sm:min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search by ${searchField}...`}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex gap-3 flex-1 sm:flex-initial">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 bg-gray-50 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
            >
              All Filters
            </button>
            
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="name">Name</option>
                <option value="role">Role</option>
                <option value="skills">Skills</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
          {filters.search && (
            <span className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 rounded-full shadow-sm">
              Search by {filters.searchField}: "{filters.search}"
              <button onClick={() => setFilters({ ...filters, search: "" })} className="text-gray-500 hover:text-red-500 transition-colors">✕</button>
            </span>
          )}
          {activeFilterChips.map(({ key, value }, idx) => (
            <span key={`${key}-${value}-${idx}`} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-teal-100 text-teal-700 rounded-full shadow-sm">
              {value}
              <button onClick={() => removeFilter(key, value)} className="text-gray-500 hover:text-red-500 transition-colors">✕</button>
            </span>
          ))}
        </div>
      </div>

      {isSidebarOpen && (
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  );
}