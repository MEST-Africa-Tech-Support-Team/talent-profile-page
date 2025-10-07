import { Outlet } from "react-router";
import usePageTracking from "../hooks/usePageTracking";

export default function Layout() {
	usePageTracking(); // 👈 this will now be inside Router context
	return <Outlet />;
}

