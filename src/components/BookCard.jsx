const BookCard = ({ book }) => {
  const title = book.title;
  const author = book.authors[0]?.name || "Unknown Author";
  const cover = book.formats["image/jpeg"] || "";
  const subject = book.subjects[0] || "Fiction";

  return (
    <div className="bg-white rounded-2xl p-4 border hover:shadow-lg transition-shadow cursor-pointer">
      {/* Book Cover */}
      <div className="bg-gray-100 rounded-xl flex justify-center items-center h-52 mb-4">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-contain rounded-xl"
          />
        ) : (
          <div className="text-gray-400 text-sm">No Cover</div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-2">
        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          Young Adult
        </span>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          Fiction
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-base mb-1 line-clamp-1">{title}</h3>

      {/* Author */}
      <p className="text-sm text-gray-500 mb-3">By : {author}</p>

      {/* Bottom */}
      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-500">{subject.slice(0, 20)}</span>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">4.5</span>
          <span className="text-yellow-400">★</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
