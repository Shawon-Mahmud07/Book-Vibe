import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

if (!API_KEY) {
  throw new Error("Google Books API key is not configured!");
}

const fetchBooks = async () => {
  // Popular modern books এর list — নাম দিয়ে সরাসরি search
  const popularBooks = [
    "isbn:9780593139134", // The Midnight Library — Matt Haig (2020)
    "isbn:9781250301697", // The Invisible Life of Addie LaRue — V.E. Schwab (2020)
    "isbn:9780593311295", // Project Hail Mary — Andy Weir (2021)
    "isbn:9781982173432", // Atomic Habits (2022 edition)
    "isbn:9780593230572", // The Four Winds — Kristin Hannah (2021)
    "isbn:9780385547970", // Lessons in Chemistry — Bonnie Garmus (2022)
    "isbn:9781668002179", // Tomorrow, and Tomorrow, and Tomorrow (2022)
    "isbn:9780593315200", // Spare — Prince Harry (2023)
    "isbn:9780593492543", // Happy Place — Emily Henry (2023)
    "isbn:9781250178633", // Fourth Wing — Rebecca Yarros (2023)
    "isbn:9780593799086", // Intermezzo — Sally Rooney (2024)
    "isbn:9780593654101", // James — Percival Everett (2024)
  ];

  const results = await Promise.all(
    popularBooks.map((book) =>
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book)}&maxResults=1&printType=books&langRestrict=en&key=${API_KEY}`,
      ),
    ),
  );

  return results
    .filter((res) => res.data.items?.length > 0)
    .map((res) => {
      const item = res.data.items[0];
      return {
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        cover:
          item.volumeInfo.imageLinks?.thumbnail?.replace(
            "http://",
            "https://",
          ) || null,
        rating: item.volumeInfo.averageRating || null,
        ratingsCount: item.volumeInfo.ratingsCount || 0,
        categories: item.volumeInfo.categories || ["General"],
        pageCount: item.volumeInfo.pageCount || null,
        publishedDate: item.volumeInfo.publishedDate || null,
        description: item.volumeInfo.description || null,
        previewLink: item.volumeInfo.previewLink || null,
      };
    });
};
const useBooks = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

  return { books: data, isLoading, isError };
};

export default useBooks;
