import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-360 mx-auto">
      <Navbar />
      <Outlet />
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
