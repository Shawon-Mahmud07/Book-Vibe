import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

//multiple queries to get a more diverse set of books. Each query targets a different subject and sorts by newest.
const queries = [
  "subject:fiction&orderBy=newest",
  "subject:thriller&orderBy=newest",
  "subject:biography&orderBy=newest",
  "subject:science&orderBy=newest",
  "subject:history&orderBy=newest",
  "subject:fantasy&orderBy=newest",
  "subject:romance&orderBy=newest",
  "subject:mystery&orderBy=newest",
];

const fetchBooks = async () => {
  if (!API_KEY) throw new Error("Google Books API key is not configured!");

  const results = await Promise.allSettled(
    queries.map((q) =>
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=10&printType=books&langRestrict=en&key=${API_KEY}`,
      ),
    ),
  );

  const allBooks = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value.data.items || []);

  // Duplicate remove
  const unique = [...new Map(allBooks.map((item) => [item.id, item])).values()];

  // Filter out books without thumbnails and map to our format
  return unique
    .filter((item) => item.volumeInfo.imageLinks?.thumbnail)
    .map((item) => ({
      id: item.id,
      title: item.volumeInfo.title || "Unknown Title",
      authors: item.volumeInfo.authors || ["Unknown Author"],
      cover: item.volumeInfo.imageLinks.thumbnail.replace(
        "http://",
        "https://",
      ),
      rating: item.volumeInfo.averageRating || null,
      ratingsCount: item.volumeInfo.ratingsCount || 0,
      categories: item.volumeInfo.categories || ["General"],
      pageCount: item.volumeInfo.pageCount || null,
      publishedDate: item.volumeInfo.publishedDate || null,
      description: item.volumeInfo.description || null,
      previewLink: item.volumeInfo.previewLink || null,
    }));
};

// Custom hook to fetch books using React Query
const useBooks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { books: data, isLoading, isError };
};

// Utility function to extract unique genres from the list of books
export const getUniqueGenres = (books) =>
  books ? [...new Set(books.flatMap((b) => b.categories))] : [];
export default useBooks;
