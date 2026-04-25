import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionButton = motion.button;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button যখন page scroll down হয়
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // ← smooth animation
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors duration-300 shadow-lg z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </MotionButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
