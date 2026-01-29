import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<span className="text-lg sm:text-xl font-bold text-gray-800">Talent Connect</span>
					</div>
					
					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-4 lg:space-x-8">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive
										? "text-blue-600 bg-blue-50"
										: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
								}`
							}
						>
							Home
						</NavLink>
						
						<NavLink
							to="/projects"
							className={({ isActive }) =>
								`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive
										? "text-blue-600 bg-blue-50"
										: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
								}`
							}
						>
							Projects
						</NavLink>
						
						<NavLink
							to="#"
							className={({ isActive }) =>
								`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									isActive
										? "text-blue-600 bg-blue-50"
										: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
								}`
							}
						>
							Testimonials
						</NavLink>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-gray-700 hover:text-blue-600 focus:outline-none"
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<div className="md:hidden pb-4">
						<div className="flex flex-col space-y-2">
							<NavLink
								to="/"
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) =>
									`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
									}`
								}
							>
								Home
							</NavLink>
							
							<NavLink
								to="/projects"
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) =>
									`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
									}`
								}
							>
								Projects
							</NavLink>
							
							<NavLink
								to="#"
								onClick={() => setIsMenuOpen(false)}
								className={({ isActive }) =>
									`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
									}`
								}
							>
								Testimonials
							</NavLink>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
