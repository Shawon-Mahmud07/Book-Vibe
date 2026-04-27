import { useState, useEffect } from "react";

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

  // Sync to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listedBooks));
  }, [listedBooks]);

  const addBook = (book) => {
    setListedBooks((prev) => {
      if (prev.find((b) => b.id === book.id)) return prev; // duplicate চেক
      return [...prev, book];
    });
  };

  const removeBook = (bookId) => {
    setListedBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  const isListed = (bookId) => listedBooks.some((b) => b.id === bookId);

  const clearAll = () => setListedBooks([]);

  return { listedBooks, addBook, removeBook, isListed, clearAll };
};

export default useListedBooks;
