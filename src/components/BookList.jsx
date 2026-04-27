import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();

  return (
    <section className="px-6 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Books</h2>

      {isError && (
        <div className="text-center text-red-500 py-10">
          Something went wrong! Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}

        {!isLoading &&
          books?.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              isListed={isListed(book.id)}
              onToggle={() =>
                isListed(book.id) ? removeBook(book.id) : addBook(book)
              }
            />
          ))}
      </div>
    </section>
  );
};

export default BookList;
