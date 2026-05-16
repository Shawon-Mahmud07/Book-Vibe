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

// ─── Context
const ListedBooksContext = createContext(null);

export const ListedBooksProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [listedBooks, setListedBooks] = useState([]);
  const [readingStatus, setReadingStatus] = useState({});
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

// ─── Load from Firestore when user logs in ───
  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => {
        setListedBooks([]);
        setReadingStatus({});
      }, 0);
      return;
    }
    const loadFromFirestore = async () => {
      setIsLoadingBooks(true);
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setListedBooks(data.listedBooks || []);
          setReadingStatus(data.readingStatus || {});
        } else {
          await setDoc(ref, { listedBooks: [], readingStatus: {} });
          setListedBooks([]);
          setReadingStatus({});
        }
      } catch (error) {
        console.error("Firestore load error:", error);
        toast.error("Failed to load your reading list");
      } finally {
        setIsLoadingBooks(false);
      }
    };

    loadFromFirestore();
  }, [currentUser]);

  // ─── Add Book ───
  const addBook = async (book) => {
    if (!currentUser) return;
    if (listedBooks.find((b) => b.id === book.id)) {
      toast.info("Already in your list!", { description: book.title });
      return;
    }

    setListedBooks((prev) => [...prev, book]);
    toast.success("Added to list!", { description: book.title, icon: "📚" });

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(ref, { listedBooks: arrayUnion(book) }, { merge: true });
    } catch {
      setListedBooks((prev) => prev.filter((b) => b.id !== book.id));
      toast.error("Failed to save book. Please try again.");
    }
  };

  // ─── Remove Book ───
  const removeBook = async (bookId) => {
    if (!currentUser) return;
    const book = listedBooks.find((b) => b.id === bookId);
    if (!book) return;

    setListedBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast.error("Removed from list", { description: book.title });

    try {
      const ref = doc(db, "users", currentUser.uid);
      await setDoc(ref, { listedBooks: arrayRemove(book) }, { merge: true });
    } catch {
      setListedBooks((prev) => [...prev, book]);
      toast.error("Failed to remove book. Please try again.");
    }
  };

  // ─── Set Reading Status ───
  const setStatus = async (bookId, status) => {
    if (!currentUser) return;
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


const useListedBooks = () => {
  const context = useContext(ListedBooksContext);
  if (!context) {
    throw new Error("useListedBooks must be used within ListedBooksProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useListedBooks;
