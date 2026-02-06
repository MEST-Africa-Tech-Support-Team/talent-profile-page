import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import ProjectCard from "./ProjectCard";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import { apiClient } from "../../api/client";
import PageWrapper from "./PageWrapper";
import { motion } from "framer-motion";
import ProjectBanner from "./ProjectBanner";


const Projects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        category: "",
        projectTypes: [],
        techStack: [],
    });

    const projectsPerPage = 18; // 6 rows * 3 columns

    const categories = [
        { value: "ECOMMERCE", label: "E-commerce" },
        { value: "FINTECH", label: "FinTech" },
        { value: "SAAS_PRODUCTIVITY", label: "SaaS" },
        { value: "EDTECH", label: "EdTech" },
        { value: "AI_MACHINE_LEARNING", label: "AI/ML" },
        { value: "HEALTH_FITNESS", label: "Health Fitness" },
        { value: "OPEN_SOURCE", label: "Open Source" },
        { value: "MARKERTING", label: "Marketing" }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await apiClient.get('/projects');
                const projectsData = response.data?.projects || response.data || [];
                if (Array.isArray(projectsData)) {
                    setProjects(projectsData);
                } else {
                    setProjects([]);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err.message || 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Category filter (from tabs)
            if (filters.category) {
                const projectType = project.projectType || "";
                if (projectType !== filters.category) {
                    return false;
                }
            }

            // Project type filter (from additional filters)
            if (filters.projectTypes.length > 0) {
                if (!filters.projectTypes.includes(project.projectType)) {
                    return false;
                }
            }

            // Tech stack filter
            if (filters.techStack.length > 0) {
                const projectTechStack = project.techStack || [];
                const hasMatchingTech = filters.techStack.some(filterTech => 
                    projectTechStack.some(projectTech => 
                        projectTech.toLowerCase().includes(filterTech.toLowerCase())
                    )
                );
                if (!hasMatchingTech) return false;
            }

            return true;
        });
    }, [projects, filters]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Pagination handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Count active filters
    const activeFiltersCount = filters.projectTypes.length + filters.techStack.length;

   return (
        <PageWrapper className="bg-white">
            <ProjectBanner />

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="text-red-500 dark:text-red-400 text-lg font-semibold mb-2">
                            Failed to load projects
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                        </div>
            ) : (

            <div className="min-h-screen px-4 sm:px-6 lg:px-8 bg-white">
                {/* Category Tabs */}
                <div className="my-6 sm:my-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
                            <button
                                onClick={() => setFilters({ ...filters, category: "" })}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm transition-all ${
                                    filters.category === ""
                                        ? "bg-primary-100 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                All Projects
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setFilters({ ...filters, category: category.value })}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-semibold transition-all ${
                                        filters.category === category.value
                                            ? "bg-primary-100 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                            <button
                        onClick={() => setShowFilterSidebar(true)}
                        className="relative px-6 py-3 rounded-lg text-sm bg-primary-100 text-white font-semibold shadow transition-all cursor-pointer hover:bg-primary-200"
                    >
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#ff6221] text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                        </div>
                    </div>
                </div>

                {/* Filter Button */}
                {/* <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => setShowFilterSidebar(true)}
                        className="relative px-6 py-3 rounded-lg text-sm bg-primary-100 text-white font-semibold shadow transition-all cursor-pointer hover:bg-primary-200"
                    >
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#ff6221] text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div> */}

                {/* Active Filters Display */}
                {(filters.category || filters.projectTypes.length > 0 || filters.techStack.length > 0) && (
                    <div className="mb-6 flex flex-wrap gap-2 items-center max-w-7xl mx-auto">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Active filters:</span>
                        {filters.category && (
                            <span className="px-2.5 sm:px-3 py-1 bg-primary-100 text-white text-xs sm:text-sm rounded-full flex items-center gap-2">
                                Category: {categories.find(c => c.value === filters.category)?.label || filters.category}
                                <button
                                    onClick={() => setFilters({ ...filters, category: "" })}
                                    className="hover:text-gray-200 transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.projectTypes.map((type) => (
                            <span
                                key={type}
                                className="px-2.5 sm:px-3 py-1 bg-[#28bbbb] text-white text-xs sm:text-sm rounded-full flex items-center gap-2"
                            >
                                {type.replace(/_/g, ' ')}
                                <button
                                    onClick={() => setFilters({
                                        ...filters,
                                        projectTypes: filters.projectTypes.filter(t => t !== type)
                                    })}
                                    className="hover:text-gray-200 transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        {filters.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 sm:px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm rounded-full flex items-center gap-2"
                            >
                                {tech}
                                <button
                                    onClick={() => setFilters({
                                        ...filters,
                                        techStack: filters.techStack.filter(t => t !== tech)
                                    })}
                                    className="hover:text-gray-200 transition-colors"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <button
                            onClick={() => setFilters({ category: "", projectTypes: [], techStack: [] })}
                            className="text-xs sm:text-sm text-[#ff6221] hover:underline font-semibold"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-4 text-sm sm:text-base text-gray-600 max-w-7xl mx-auto px-2">
                    Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-gray-600 text-lg">
                                {filters.category || activeFiltersCount > 0 
                                    ? "No projects match your filters" 
                                    : "No projects found"
                                }
                            </p>
                            {(filters.category || activeFiltersCount > 0) && (
                                <button
                                    onClick={() => setFilters({ category: "", projectTypes: [], techStack: [] })}
                                    className="mt-4 px-4 py-2 bg-[#28bbbb] text-white rounded-lg hover:bg-[#239999] transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto pb-16 sm:pb-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {currentProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    Previous
                                </button>

                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        // Show first page, last page, current page, and pages around current
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                                        currentPage === pageNumber
                                                            ? "bg-primary-100 text-white"
                                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        } else if (
                                            pageNumber === currentPage - 2 ||
                                            pageNumber === currentPage + 2
                                        ) {
                                            return (
                                                <span key={pageNumber} className="flex items-center px-2">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            )}
            
            {/* Filter Sidebar */}
            {showFilterSidebar && (
                <ProjectFilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onClose={() => setShowFilterSidebar(false)}
                />
            )}
        </PageWrapper>
    );
};

export default Projects;