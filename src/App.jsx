// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router";
// import TalentsPage from "./pages/Home";
//
//
// const talentAppRouter = createBrowserRouter(
//   [
//     {path: '/', element: <TalentsPage />},
//     // {path: '*', element: <NotFound />}
//   ]
// )
//
// export default function App() {
//   return (
//     <>
//         <RouterProvider router={talentAppRouter} />
//     </>
//   )
// }

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";
import { useLocation } from "react-router";
import TalentsPage from "./pages/Home";
import usePageTracking from "./hooks/usePageTracking";

const talentAppRouter = createBrowserRouter([
	{ path: "/", element: <TalentsPage /> },
	// { path: "*", element: <NotFound /> }
]);

function AppContent() {
	usePageTracking(); // 👈 Tracks every route change
	return <RouterProvider router={talentAppRouter} />;
}

export default function App() {
	return <AppContent />;
}
