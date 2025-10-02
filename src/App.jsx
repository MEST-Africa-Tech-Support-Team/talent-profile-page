// Original code without page tracking
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


// Code to add page tracking with ReactGA

// import {
// 	createBrowserRouter,
// 	RouterProvider,
// } from "react-router";
// // import { useLocation } from "react-router";
// import TalentsPage from "./pages/Home";
// import usePageTracking from "./hooks/usePageTracking";
//
// const talentAppRouter = createBrowserRouter([
// 	{ path: "/", element: <TalentsPage /> },
// 	// { path: "*", element: <NotFound /> }
// ]);
//
// function AppContent() {
// 	usePageTracking(); // 👈 Tracks every route change
// 	return <RouterProvider router={talentAppRouter} />;
// }
//
// export default function App() {
// 	return <AppContent />;
// }

// Code to fix error
import { createBrowserRouter, RouterProvider } from "react-router";
import TalentsPage from "./pages/Home";
import Layout from "./components/Layout"; // adjust path if needed

const talentAppRouter = createBrowserRouter([
	{
		element: <Layout />,   // 👈 wrap routes in Layout
		children: [
			{ path: "/", element: <TalentsPage /> },
			// { path: "*", element: <NotFound /> }
		]
	}
]);

export default function App() {
	return <RouterProvider router={talentAppRouter} />;
}
