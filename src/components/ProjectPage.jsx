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
        category: "",
        projectTypes: [],
        techStack: [],
    });

    const categories = [
        "E-commerce",
        "FinTech",
        "SaaS",
        "EdTech",
        "AI/ML",
        "Health Fitness",
        "Open Source",
        "Marketing"
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
            // Category filter
            if (filters.category) {
                const projectCategory = project.category || project.projectType || "";
                if (projectCategory.toLowerCase() !== filters.category.toLowerCase()) {
                    return false;
                }
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
            <section className="bg-primary-100 text-white px-4 sm:px-6 md:px-10 py-6 sm:py-8 text-center min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 font-bold mt-4 sm:mt-6 leading-snug">
                    Discover Amazing <br className="hidden sm:block" /> Projects
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
                    Explore innovative projects built by talented developers from{" "}
                    <br className="hidden sm:block" /> across the MEST community
                </p>
            </section>

            <div className="min-h-screen px-4 sm:px-6 lg:px-8 bg-white">
                {/* Category Tabs */}
                <div className="my-6 sm:my-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
                            <button
                                onClick={() => setFilters({ ...filters, category: "" })}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all ${
                                    filters.category === ""
                                        ? "bg-primary-100 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                All Projects
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilters({ ...filters, category })}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all ${
                                        filters.category === category
                                            ? "bg-primary-100 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Button */}
                <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => setShowFilterSidebar(true)}
                        className="relative px-6 py-3 rounded-xl bg-primary-100 text-white font-semibold shadow transition-all cursor-pointer hover:bg-primary-200"
                    >
                        Additional Filters
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#ff6221] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Active Filters Display */}
                {(filters.category || filters.projectTypes.length > 0 || filters.techStack.length > 0) && (
                    <div className="mb-6 flex flex-wrap gap-2 items-center max-w-7xl mx-auto">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">Active filters:</span>
                        {filters.category && (
                            <span className="px-2.5 sm:px-3 py-1 bg-primary-100 text-white text-xs sm:text-sm rounded-full flex items-center gap-2">
                                Category: {filters.category}
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
                    Showing {filteredProjects.length} of {projects.length} projects
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
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

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