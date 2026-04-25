import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const Hero = () => {
  return (
    <div
      className="bg-muted rounded-2xl mx-6 my-6 
      px-8 md:px-28 py-20 md:py-28
      flex flex-col-reverse md:flex-row 
      items-center justify-between gap-12"
    >
      {/* Left Side - Text */}
      <div className="space-y-8 text-center md:text-left max-w-lg">
        {/* Badge */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-foreground/10 text-foreground text-sm font-medium px-4 py-1.5 rounded-full"
        >
          <BookOpen className="w-4 h-4" />
          62,000+ Free Classic Books
        </MotionDiv>

        {/* Heading */}
        <MotionH1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Books to{" "}
          <span className="relative inline-block">
            freshen up
            {/* Underline decoration */}
            <motion.span
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
          className="text-muted-foreground text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Discover timeless classics, expand your reading list, and fall in love
          with books — all for free.
        </MotionP>

        {/* Buttons */}
        <MotionDiv
          className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Primary Button */}
          <Button
            className="group bg-foreground text-background hover:bg-foreground/90
            px-8 py-6 text-base font-semibold rounded-xl
            flex items-center gap-2 transition-all duration-300"
          >
            View The List
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {/* Secondary Button */}
          <Button
            variant="outline"
            className="px-8 py-6 text-base font-semibold rounded-xl
            border-foreground/20 hover:bg-foreground/5
            flex items-center gap-2 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4" />
            Browse Genres
          </Button>
        </MotionDiv>
      </div>

      {/* Right Side - Book Image */}
      <MotionDiv
        className="flex justify-center relative"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Glow effect behind image */}
        <div className="absolute inset-0 bg-foreground/10 rounded-full blur-3xl scale-75" />

        {/* Floating animation */}
        <motion.img
          src="/book-hero.jpg"
          alt="Featured Book"
          className="relative w-48 md:w-64 lg:w-72 object-contain drop-shadow-2xl rounded-lg"
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
