import { Outlet } from "react-router";
import usePageTracking from "../hooks/usePageTracking";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
	usePageTracking(); // 👈 this will now be inside Router context
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}