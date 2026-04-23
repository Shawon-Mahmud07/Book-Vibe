import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook to fetch books data
const useBooks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    //Fetch books data from the Gutendex API
    queryFn: async () => {
      const res = await axios.get(
        "https://gutendex.com/books/?languages=en&page=1",
      );
      return res.data.results;
    },
    staleTime: 5 * 60 * 1000, // 5 মিনিট cache এ রাখবে
  });
  return { books: data, isLoading, isError };
};

export default useBooks;
