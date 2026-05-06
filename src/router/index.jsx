import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import ListedBooks from "@/pages/ListedBooks";
import PagesToRead from "@/pages/PagesToRead";
import BookDetail from "@/pages/BookDetail";
import NotFound from "@/pages/NotFound";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/static/PrivacyPolicy";
import TermsOfService from "@/pages/static/TermsOfService";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import CookiePolicy from "@/pages/static/CookiePolicy";
import Search from "@/pages/Search";

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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      { path: "blog/:id", element: <BlogDetail /> },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookies",
        element: <CookiePolicy />,
      },
      {
        path: "terms",
        element: <TermsOfService />,
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
