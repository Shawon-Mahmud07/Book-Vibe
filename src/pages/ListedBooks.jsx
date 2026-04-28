import { motion } from "framer-motion";
import { BookMarked, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import useListedBooks from "@/hooks/useListedBooks";
import BookCard from "@/components/BookCard";

const MotionDiv = motion.div;

const ListedBooks = () => {
  const { listedBooks, removeBook, clearAll } = useListedBooks();

  return (
    <div className="px-6 md:px-10 py-12 min-h-[60vh]">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-accent-green" />
            Listed Books
          </h1>
          <p className="text-muted-foreground mt-1">
            <span className="text-accent-green font-semibold">
              {listedBooks.length}
            </span>{" "}
            book{listedBooks.length !== 0 ? "s" : ""} saved
          </p>
        </div>

        {listedBooks.length > 0 && (
          <Button
            variant="outline"
            className="border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 gap-2"
            onClick={clearAll}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </MotionDiv>

      {/* Empty State */}
      {listedBooks.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="bg-accent-green-light rounded-full p-6 mb-6">
            <BookOpen className="w-12 h-12 text-accent-green animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No books yet
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Go to the Home page and click "Add to List" on any book to save it
            here.
          </p>
        </MotionDiv>
      )}

      {/* Books Grid */}
      {listedBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listedBooks.map((book, index) => (
            <MotionDiv key={book.id} className="relative group">
              <BookCard book={book} index={index} showListButton={false} />
              {/* Remove button */}
              <button
                onClick={() => removeBook(book.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5
                  md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200
                  hover:bg-red-600 shadow-md"
                title="Remove from list"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListedBooks;
