import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import ListedBooks from "@/pages/ListedBooks";
import PagesToRead from "@/pages/PagesToRead";
import BookDetail from "@/pages/BookDetail";
import NotFound from "@/pages/NotFound";
import AboutUs from "@/pages/AboutUs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "listed-books",
        element: <ListedBooks />,
      },
      {
        path: "pages-to-read",
        element: <PagesToRead />,
      },
      {
        path: "book/:id",
        element: <BookDetail />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
