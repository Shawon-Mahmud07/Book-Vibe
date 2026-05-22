  import { useEffect, useState } from "react";
  import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    deleteUser,
  } from "firebase/auth";
  import { auth, googleProvider } from "@/firebase/firebase";
  import { AuthContext } from "./AuthContext";

  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Login
    const loginWithGoogle = async () => {
      try {
        return await signInWithPopup(auth, googleProvider);
      } catch (error) {
        if (
          error.code !== "auth/popup-closed-by-user" &&
          error.code !== "auth/cancelled-popup-request"
        ) {
          throw error;
        }
      }
    };

    // Email Login
    const loginWithEmail = async (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };

    // Register
  const register = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    await result.user.reload();
    setCurrentUser({ ...auth.currentUser }); // ← displayName সাথে সাথে update হবে
    return result;
  };

    // Logout
    const logout = async () => {
      return signOut(auth);
    };

    // Update display name & photo
    const updateUserProfile = async (displayName, photoURL) => {
      return updateProfile(auth.currentUser, { displayName, photoURL });
    };

    // Delete account
    const deleteAccount = async () => {
      return deleteUser(auth.currentUser);
    };

    // Auth state listener
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }, []);

    const value = {
      currentUser,
      loading,
      loginWithGoogle,
      loginWithEmail,
      register,
      logout,
      updateUserProfile,
      deleteAccount,
    };

 return (
   <AuthContext.Provider value={value}>
     {children}
     {/* Fullscreen loading overlay while auth state is being determined */}
     {loading && (
       <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
         <div className="w-8 h-8 rounded-full border-2 border-accent-green border-t-transparent animate-spin" />
       </div>
     )}
   </AuthContext.Provider>
 );
  };
