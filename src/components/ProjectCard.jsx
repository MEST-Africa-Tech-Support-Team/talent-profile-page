
import { Github, Link, ImageOff } from 'lucide-react';

const ProjectCard = ({ project }) => {
  // Helper to safely trim and validate URLs
  const cleanUrl = (url) => {
    if (!url) return null;
    const trimmed = url.trim();
    return trimmed && trimmed !== '#' ? trimmed : null;
  };

  // Format date to "Jan 26, 2026"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get first valid image URL or null
  const mainImage = project.images?.[0] ? cleanUrl(project.images[0]) : null;
  const creators = project.createdBy?.join(', ') || 'Anonymous';
  const createdAt = formatDate(project.createdAt);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      {/* Image Section */}
      <div className="h-48 overflow-hidden bg-gray-50 dark:bg-gray-700">
        {mainImage ? (
          <img
            src={mainImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <div class="text-center p-4">
                    <ImageOff className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" />
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Image unavailable</p>
                  </div>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
            <ImageOff className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-2" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">No preview available</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">
            {project.description || 'No description provided'}
          </p>
          
          {/* Tech Stack Badges */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-700"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-3">
            {project.links?.flatMap((linkSet, setIndex) => {
              const githubUrl = cleanUrl(linkSet.gitHub);
              const liveUrl = cleanUrl(linkSet.live);
              
              return [
                githubUrl && (
                  <a
                    key={`gh-${setIndex}`}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors group/link"
                    aria-label="GitHub repository"
                  >
                    <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                    <span className="text-sm font-medium hidden sm:inline">Code</span>
                  </a>
                ),
                liveUrl && (
                  <a
                    key={`live-${setIndex}`}
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors group/link"
                    aria-label="Live demo"
                  >
                    <Link size={18} className="group-hover/link:scale-110 transition-transform" />
                    <span className="text-sm font-medium hidden sm:inline">Live Demo</span>
                  </a>
                )
              ].filter(Boolean);
            })}
          </div>
          
          {/* Creator & Date */}
          <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>By {creators}</span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
    </div>
  );
};

export default ProjectCard;