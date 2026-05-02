import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionImg = motion.img;
const MotionSpan = motion.span;

const Hero = () => {
  return (
    <div
      className="bg-muted rounded-2xl mx-4 sm:mx-6 my-6 
      px-6 sm:px-8 md:px-12 lg:px-28 py-12 md:py-20 lg:py-28
      flex flex-col-reverse lg:flex-row 
      items-center justify-between gap-10 md:gap-12"
    >
      {/* Left Side - Text */}
      <div className="space-y-6 md:space-y-8 text-center lg:text-left max-w-lg w-full">
        {/* Badge */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-foreground/10 text-foreground text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap"
        >
          <BookOpen className="w-4 h-4 text-accent-green shrink-0" />
          <span>
            <span className="text-accent-green font-bold">Discover</span> Modern
            & Classic Books
          </span>
        </MotionDiv>

        {/* Heading */}
        <MotionH1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Books to{" "}
          <span className="relative inline-block">
            freshen up
            <MotionSpan
              className="absolute -bottom-1 left-0 h-0.75 bg-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
          </span>
          <br />
          your bookshelf
        </MotionH1>

        {/* Subtitle */}
        <MotionP
          className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Discover timeless classics, expand your reading list, and fall in love
          with books — all for free.
        </MotionP>

        {/* Buttons - Slimmer and responsive */}
        <MotionDiv
          className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/listed-books" className="w-full sm:w-auto">
            <Button
              className="group bg-foreground text-background hover:bg-foreground/90
              w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-semibold rounded-xl
              flex items-center justify-center gap-2 transition-all duration-300"
            >
              View The List
              <ArrowRight className="w-4 h-4 text-accent-green group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          <a href="#books" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-semibold border-border text-foreground rounded-xl
              hover:bg-foreground/5 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4 text-accent-green" />
              Browse Genres
            </Button>
          </a>
        </MotionDiv>
      </div>

      {/* Right Side - Image */}
      <MotionDiv
        className="flex justify-center relative w-full lg:w-auto"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-foreground/5 rounded-full blur-3xl scale-75" />

        <MotionImg
          src="/book-hero.jpg"
          alt="Featured Book"
          className="relative w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 object-contain drop-shadow-2xl rounded-2xl"
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </MotionDiv>
    </div>
  );
};

export default Hero;
