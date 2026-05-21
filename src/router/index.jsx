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
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/ProtectedRoute";
import Profile from "@/pages/Profile";

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
        element: <Search />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },

      {
        path: "listed-books",
        element: (
          <ProtectedRoute>
            <ListedBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "pages-to-read",
        element: (
          <ProtectedRoute>
            <PagesToRead />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
