import { useState, useEffect, startTransition } from "react";
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

const STORAGE_KEY = "book-vibe-listed";
const STATUS_KEY = "book-vibe-status";

const useListedBooks = () => {
  const { currentUser } = useAuth();

  const [listedBooks, setListedBooks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [readingStatus, setReadingStatus] = useState(() => {
    try {
      const stored = localStorage.getItem(STATUS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // ─── Load from Firestore when user logs in ───
  useEffect(() => {
    if (!currentUser) return;

    const loadFromFirestore = async () => {
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          startTransition(() => {
            setListedBooks(data.listedBooks || []);
            setReadingStatus(data.readingStatus || {});
          });
        } else {
          const storedBooks = localStorage.getItem(STORAGE_KEY);
          const storedStatus = localStorage.getItem(STATUS_KEY);
          const books = storedBooks ? JSON.parse(storedBooks) : [];
          const status = storedStatus ? JSON.parse(storedStatus) : {};

          await setDoc(ref, { listedBooks: books, readingStatus: status });

          startTransition(() => {
            setListedBooks(books);
            setReadingStatus(status);
          });
        }
      } catch (error) {
        console.error("Firestore load error:", error);
      }
    };

    loadFromFirestore();
  }, [currentUser]);

  // ─── Reset when user logs out ───
  useEffect(() => {
    if (currentUser) return;

    const storedBooks = localStorage.getItem(STORAGE_KEY);
    const storedStatus = localStorage.getItem(STATUS_KEY);

    startTransition(() => {
      try {
        setListedBooks(storedBooks ? JSON.parse(storedBooks) : []);
        setReadingStatus(storedStatus ? JSON.parse(storedStatus) : {});
      } catch {
        setListedBooks([]);
        setReadingStatus({});
      }
    });
  }, [currentUser]);

  // ─── Save to localStorage ───
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listedBooks));
  }, [listedBooks]);

  useEffect(() => {
    localStorage.setItem(STATUS_KEY, JSON.stringify(readingStatus));
  }, [readingStatus]);

  // ─── Add Book ───
  const addBook = async (book) => {
    if (listedBooks.find((b) => b.id === book.id)) {
      toast.info("Already in your list!", { description: book.title });
      return;
    }

    setListedBooks((prev) => [...prev, book]);
    toast.success("Added to list!", { description: book.title, icon: "📚" });

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { listedBooks: arrayUnion(book) });
      } catch {
        await setDoc(doc(db, "users", currentUser.uid), {
          listedBooks: [book],
          readingStatus,
        });
      }
    }
  };

  // ─── Remove Book ───
  const removeBook = async (bookId) => {
    const book = listedBooks.find((b) => b.id === bookId);
    if (!book) return;

    setListedBooks((prev) => prev.filter((b) => b.id !== bookId));
    toast.error("Removed from list", { description: book.title });

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { listedBooks: arrayRemove(book) });
      } catch (error) {
        console.error("Firestore remove error:", error);
      }
    }
  };

  // ─── Set Reading Status ───
  const setStatus = async (bookId, status) => {
    setReadingStatus((prev) => ({ ...prev, [bookId]: status }));

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { [`readingStatus.${bookId}`]: status });
      } catch (error) {
        console.error("Firestore status error:", error);
      }
    }
  };

  // ─── Get Reading Status ───
  const getStatus = (bookId) => readingStatus[bookId] || "want-to-read";

  // ─── Clear All ───
  const clearAll = async () => {
    setListedBooks([]);
    setReadingStatus({});
    toast.error("Reading list cleared", { description: "All books removed" });

    if (currentUser) {
      try {
        const ref = doc(db, "users", currentUser.uid);
        await updateDoc(ref, { listedBooks: [], readingStatus: {} });
      } catch (error) {
        console.error("Firestore clear error:", error);
      }
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
  };
};

export default useListedBooks;
