import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";


const MotionDiv = motion.div;
const RootLayout = () => {
  const location = useLocation(); 

  return (
    <div className="max-w-360 mx-auto">
      <Navbar />
      <AnimatePresence>
        <MotionDiv
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </MotionDiv>
      </AnimatePresence>
      <Footer />
      <ScrollRestoration />
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          duration: 4000,
          classNames: {
            toast:
              "bg-card text-foreground border border-border shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl",
            title: "text-foreground font-semibold text-sm",
            description: "!text-foreground/70 text-xs",
            closeButton:
              "!bg-background !text-foreground !border !border-border hover:!bg-muted",
            error: "border-l-4 !border-l-red-600",
            success: "border-l-4 !border-l-[#23BE0A]",
            info: "border-l-4 border-l-blue-500",
          },
        }}
      />
    </div>
  );
};

export default RootLayout;
