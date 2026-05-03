import { useState, useEffect } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "book-vibe-listed";

const useListedBooks = () => {
  const [listedBooks, setListedBooks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listedBooks));
  }, [listedBooks]);

  const addBook = (book) => {
    if (listedBooks.find((b) => b.id === book.id)) {
      toast.info("Already in your list!", {
        description: book.title,
      });
      return;
    }
    toast.success("Added to list!", {
      description: book.title,
      icon: "📚",
    });
    setListedBooks((prev) => [...prev, book]);
  };

  const removeBook = (bookId) => {
    const book = listedBooks.find((b) => b.id === bookId);
    if (book) {
      toast.error("Removed from list", {
        description: book.title,
      });
    }
    setListedBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  const isListed = (bookId) => listedBooks.some((b) => b.id === bookId);

  const clearAll = () => {
    toast.error("Reading list cleared", {
      description: "All books removed",
    });
    setListedBooks([]);
  };

  return { listedBooks, addBook, removeBook, isListed, clearAll };
};

export default useListedBooks;
