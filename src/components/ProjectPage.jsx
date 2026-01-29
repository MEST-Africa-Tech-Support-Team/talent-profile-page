import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import ProjectCard from "./ProjectCard";
import ProjectFilterSidebar from "./ProjectFilterSidebar";
import { apiClient } from "../../api/client";
import PageWrapper from "./PageWrapper";


const Projects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [filters, setFilters] = useState({
        search: "",
        projectTypes: [],
        techStack: [],
    });

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
            // Search filter (searches in title, description, and tech stack)
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch = 
                    project.title?.toLowerCase().includes(searchLower) ||
                    project.description?.toLowerCase().includes(searchLower) ||
                    project.techStack?.some(tech => tech.toLowerCase().includes(searchLower)) ||
                    project.createdBy?.some(creator => creator.toLowerCase().includes(searchLower));
                
                if (!matchesSearch) return false;
            }

            // Project type filter
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

    // Count active filters
    const activeFiltersCount = filters.projectTypes.length + filters.techStack.length;

    if (loading) {
        return (
            <PageWrapper>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper>
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
            </PageWrapper>
        );
    }

    return (
        <PageWrapper className="bg-white">
            {/* Banner Section */}
            <section className="bg-[#28BBBB] text-white px-4 sm:px-6 md:px-10 py-6 sm:py-8 text-center min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 font-bold mt-4 sm:mt-6 leading-snug">
                    Discover Amazing <br className="hidden sm:block" /> Projects
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
                    Explore innovative projects built by talented developers from{" "}
                    <br className="hidden sm:block" /> across the MEST community
                </p>
            </section>

            <div className="min-h-[100vh] px-4 sm:px-6 lg:px-8 bg-white">
                {/* Search and Filter Bar */}
                <div className="my-6 sm:my-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center max-w-4xl mx-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 w-full sm:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects by title, description, or tech stack..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#28BBBB] text-gray-900 placeholder-gray-500"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilterSidebar(true)}
                        className="relative px-6 py-3 rounded-xl bg-[#28BBBB] text-white font-semibold shadow transition-all cursor-pointer hover:bg-[#239999]"
                    >
                        Filter
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#ff6221] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Active Filters Display */}
                {(filters.projectTypes.length > 0 || filters.techStack.length > 0) && (
                    <div className="mb-6 flex flex-wrap gap-2 items-center max-w-7xl mx-auto">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Active filters:</span>
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
                            onClick={() => setFilters({ search: filters.search, projectTypes: [], techStack: [] })}
                            className="text-xs sm:text-sm text-[#ff6221] hover:underline font-semibold"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-4 text-sm sm:text-base text-gray-600 max-w-7xl mx-auto px-2">
                    Showing {filteredProjects.length} of {projects.length} projects
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-gray-600 text-lg">
                                {filters.search || activeFiltersCount > 0 
                                    ? "No projects match your search or filters" 
                                    : "No projects found"
                                }
                            </p>
                            {(filters.search || activeFiltersCount > 0) && (
                                <button
                                    onClick={() => setFilters({ search: "", projectTypes: [], techStack: [] })}
                                    className="mt-4 px-4 py-2 bg-[#28bbbb] text-white rounded-lg hover:bg-[#239999] transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* <Footer /> */}

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