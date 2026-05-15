import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import useAuth from "@/hooks/useAuth";

const useListedBooks = () => {
  const { currentUser } = useAuth();
  const [listedBooks, setListedBooks] = useState([]);
  const [readingStatus, setReadingStatus] = useState({});
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  // ─── Load from Firestore when user logs in ───
  useEffect(() => {
    // If no user, clear local state immediately
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
         // Ensure we have arrays/objects even if Firestore fields are missing
          setListedBooks(data.listedBooks || []);
          setReadingStatus(data.readingStatus || {});
        } else {
          // If no document exists, create one with empty fields
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
      await updateDoc(ref, { listedBooks: arrayUnion(book) });
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
      await updateDoc(ref, { listedBooks: arrayRemove(book) });
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
      await updateDoc(ref, { [`readingStatus.${bookId}`]: status });
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
      await updateDoc(ref, { listedBooks: [], readingStatus: {} });
    } catch (error) {
      console.error("Firestore clear error:", error);
      toast.error("Failed to clear list. Please try again.");
    }
  };

  const isListed = (bookId) => listedBooks.some((b) => b.id === bookId);

  return {
    listedBooks,
    addBook,
    removeBook,
    isListed,
    clearAll,
    setStatus,
    getStatus,
    isLoadingBooks,
  };
};;

export default useListedBooks;
