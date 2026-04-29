import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MotionDiv = motion.div;

const NotFound = () => {
  return (
    <main className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center bg-background px-4 py-16 text-center text-foreground transition-colors duration-300 sm:px-6">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <div className="text-7xl font-bold leading-none text-foreground/10 select-none sm:text-9xl md:text-[160px]">
          404
        </div>
        <div className="w-fit mx-auto rounded-full border border-accent-green/20 bg-accent-green-light p-4 shadow-sm sm:p-5">
          <BookOpen className="w-8 h-8 text-accent-green sm:w-10 sm:h-10" />
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md space-y-3 mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
          Looks like this page went missing - just like a book that's been
          mis-shelved.
        </p>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
      >
        <Link to="/" className="w-full sm:w-auto">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 px-6 sm:w-auto">
            <ArrowLeft className="w-4 h-4 text-accent-green" />
            Back to Home
          </Button>
        </Link>
        <Link to="/listed-books" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full border-accent-green bg-background text-accent-green hover:bg-accent-green-light px-6 sm:w-auto"
          >
            My Listed Books
          </Button>
        </Link>
      </MotionDiv>
    </main>
  );
};

export default NotFound;
