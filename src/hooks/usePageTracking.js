import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-W377QV1MRE"; // 🔴 Replace with your GA4 ID

export default function usePageTracking() {
	const location = useLocation();
	
	useEffect(() => {
		// Initialize GA once
		ReactGA.initialize(GA_MEASUREMENT_ID);
	}, []);
	
	useEffect(() => {
		// Send pageview on route change
		ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
	}, [location]);
}
