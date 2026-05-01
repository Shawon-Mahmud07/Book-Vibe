import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MotionDiv = motion.div;
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className="max-w-360 mx-auto">
      <Navbar />
      <AnimatePresence mode="wait">
        <MotionDiv
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </MotionDiv>
      </AnimatePresence>

      <Footer />
      {/* Ensures that when navigating back to a page, the scroll position is restored to where the user left off, providing a smoother user experience. */}
      <ScrollRestoration />
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "bg-card text-foreground border border-border shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl",
            title: "text-foreground font-semibold text-sm",
            description: "!text-foreground/70 text-xs",

            closeButton:
              "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 transition-colors",

            error: "border-l-4 !border-l-red-600 bg-red-50/30",

            success: "border-l-4 !border-l-[#23BE0A]",
            info: "border-l-4 border-l-blue-500",
          },
        }}
      />
    </div>
  );
};

export default RootLayout;
