const BookCard = ({ book }) => {
  const title = book.title;
  const author = book.authors[0]?.name || "Unknown Author";
  const cover = book.formats["image/jpeg"] || "";
  const subject = book.subjects[0] || "Fiction";

  return (
    <div
      className="
      bg-white dark:bg-gray-800 
      rounded-2xl p-4 border dark:border-gray-700
      hover:shadow-xl hover:-translate-y-2 
      transition-all duration-300 
      cursor-pointer group
    "
    >
      {/* Book Cover */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl flex justify-center items-center h-52 mb-4 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-contain rounded-xl 
                       group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-400 text-sm">No Cover</div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-2">
        <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
          Young Adult
        </span>
        <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
          Fiction
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base mb-1 line-clamp-1 
                     dark:text-white group-hover:text-green-500 
                     transition-colors duration-300"
      >
        {title}
      </h3>

      {/* Author */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        By : {author}
      </p>

      {/* Bottom */}
      <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {subject.slice(0, 20)}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium dark:text-white">4.5</span>
          <span className="text-yellow-400">★</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
