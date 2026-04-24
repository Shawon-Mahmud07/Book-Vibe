import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const Hero = () => {
  return (
    <div
      className="bg-muted
      rounded-2xl mx-6 md:mx-6 my-6 
      px-8 md:px-28 py-24 
      flex flex-col-reverse md:flex-row 
      items-center justify-between gap-8"
    >
      {/* Left Side - Text */}
      <MotionDiv
        className="space-y-6 md:space-y-12 text-center md:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
          Books to freshen up <br /> your bookshelf
        </h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 md:py-7 text-base">
          View The List
        </Button>
      </MotionDiv>

      {/* Right Side - Book Image */}
      <MotionDiv
        className="flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg"
          alt="Featured Book"
          className="w-48 md:w-64 object-contain drop-shadow-xl"
        />
      </MotionDiv>
    </div>
  );
};

export default Hero;
