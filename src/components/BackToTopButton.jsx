import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionButton = motion.button;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
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
      behavior: "smooth", 
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
          className="fixed bottom-8 right-8 p-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors duration-300 shadow-lg z-40 group"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-accent-green group-hover:-translate-y-0.5 transition-transform duration-200 " />
        </MotionButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
