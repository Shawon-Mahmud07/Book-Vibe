import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook to fetch books data
const useBooks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    //Fetch books data from the Gutendex API
    queryFn: async () => {
      const res = await axios.get(
        "https://gutendex.com/books/?languages=en&page=1&page_size=12",
      );
      return res.data.results.slice(0, 12);
    },
    // Cache data for 30 minutes and garbage collect after 1 hour
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  return { books: data, isLoading, isError };
};

export default useBooks;
