import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import TalentsPage from "./pages/Home";


const talentAppRouter = createBrowserRouter(
  [
    {path: '/', element: <TalentsPage />},
    // {path: '*', element: <NotFound />}
  ]
)

export default function App() {
  return (
    <>
        <RouterProvider router={talentAppRouter} />
    </>
  )
}