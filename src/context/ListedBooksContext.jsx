import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useAuth from "@/hooks/useAuth";

const ListedBooksContext = createContext(null);

export const ListedBooksProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [listedBooks, setListedBooks] = useState([]);
  const [readingStatus, setReadingStatus] = useState({});
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  // ─── Load from Firestore when user logs in ───
  useEffect(() => {
    // If no user, clear state and exit
    if (!currentUser) {
      setTimeout(() => {
        setListedBooks([]);
        setReadingStatus({});
      }, 0);
      return;
    }

    // isMounted flag — prevents state updates after component unmounts
    let isMounted = true;

    const loadFromFirestore = async () => {
      setIsLoadingBooks(true);
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        // Stop if component has unmounted
        if (!isMounted) return;

        if (snap.exists()) {
          const data = snap.data();
          setListedBooks(data.listedBooks || []);
          setReadingStatus(data.readingStatus || {});
        } else {
          // First time user — create an empty document
          await setDoc(ref, { listedBooks: [], readingStatus: {} });
          if (!isMounted) return;
          setListedBooks([]);
          setReadingStatus({});
        }
      } catch (error) {
        // Ignore errors caused by unmounting
        if (!isMounted) return;
        console.error("Firestore load error:", error);
        toast.error("Failed to load your reading list");
      } finally {
        if (isMounted) setIsLoadingBooks(false);
      }
    };

    loadFromFirestore();

    // Cleanup — set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // ─── Add Book ───
  const addBook = async (book) => {
    if (!currentUser) return;

    if (listedBooks.find((b) => b.id === book.id)) {
      toast.info("Already in your list!", { description: book.title });
      return;
    }

    // Optimistic update — update UI first, then sync to Firestore
    setListedBooks((prev) => [...prev, book]);
    toast.success("Added to list!", { description: book.title, icon: "📚" });

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(ref, { listedBooks: arrayUnion(book) }, { merge: true });
    } catch {
      // Rollback on failure
      setListedBooks((prev) => prev.filter((b) => b.id !== book.id));
      toast.error("Failed to save book. Please try again.");
    }
  };

  // ─── Remove Book ───
  const removeBook = async (bookId) => {
    if (!currentUser) return;

    const book = listedBooks.find((b) => b.id === bookId);
    if (!book) return;

    // Optimistic update
    setListedBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast.error("Removed from list", { description: book.title });

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(ref, { listedBooks: arrayRemove(book) }, { merge: true });
    } catch {
      // Rollback on failure
      setListedBooks((prev) => [...prev, book]);
      toast.error("Failed to remove book. Please try again.");
    }
  };

  // ─── Set Reading Status ───
  const setStatus = async (bookId, status) => {
    if (!currentUser) return;

    // Optimistic update
    setReadingStatus((prev) => ({ ...prev, [bookId]: status }));

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(
        ref,
        { readingStatus: { [bookId]: status } },
        { merge: true },
      );
    } catch (error) {
      console.error("Firestore status error:", error);
      toast.error("Failed to update reading status");
    }
  };

  // ─── Get Reading Status ───
  const getStatus = (bookId) => readingStatus[bookId] || "want-to-read";

  // ─── Clear All ───
  const clearAll = async () => {
    if (!currentUser) return;

    // Optimistic update
    setListedBooks([]);
    setReadingStatus({});
    toast.error("Reading list cleared", { description: "All books removed" });

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(
        ref,
        { listedBooks: [], readingStatus: {} },
        { merge: true },
      );
    } catch (error) {
      console.error("Firestore clear error:", error);
      toast.error("Failed to clear list. Please try again.");
    }
  };

  const isListed = (bookId) => listedBooks.some((b) => b.id === bookId);

  const value = {
    listedBooks,
    addBook,
    removeBook,
    isListed,
    clearAll,
    setStatus,
    getStatus,
    isLoadingBooks,
  };

  return (
    <ListedBooksContext.Provider value={value}>
      {children}
    </ListedBooksContext.Provider>
  );
};

// Custom hook — all components use this instead of useContext directly
const useListedBooks = () => {
  const context = useContext(ListedBooksContext);
  if (!context) {
    throw new Error("useListedBooks must be used within ListedBooksProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useListedBooks;
