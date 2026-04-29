import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-360 mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    {/* Ensures that when navigating back to a page, the scroll position is restored to where the user left off, providing a smoother user experience. */}
      <ScrollRestoration/>
    </div>
  );
};

export default RootLayout;
