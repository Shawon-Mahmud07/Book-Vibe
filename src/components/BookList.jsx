import useBooks from "@/hooks/useBooks";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

const BookList = () => {
  const { books, isLoading, isError } = useBooks();

  return (
    <section className="px-6 md:px-10 py-10">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">Books</h2>

      {/* Error State */}
      {isError && (
        <div className="text-center text-red-500 py-10">
          Something went wrong! Please try again.
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Loading State — ৬টা skeleton দেখাবে */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}

        {/* Data State — real books দেখাবে */}
        {!isLoading &&
          books?.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  );
};

export default BookList;
