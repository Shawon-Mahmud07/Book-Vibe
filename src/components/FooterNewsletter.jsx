import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const MotionDiv = motion.div;

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error' | 'duplicate'

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!email.trim()) {
     setStatus("error");
     setTimeout(() => setStatus(null), 3000);
     return;
   }

   setStatus("loading");

   try {
     // Use email as document ID — automatically prevents duplicates
     const docRef = doc(db, "subscribers", email.toLowerCase().trim());
     const existing = await getDoc(docRef);

     if (existing.exists()) {
       setStatus("duplicate");
       setTimeout(() => setStatus(null), 3000);
       return;
     }

     await setDoc(docRef, {
       email: email.toLowerCase().trim(),
       subscribedAt: serverTimestamp(),
     });

     setStatus("success");
     setEmail("");
     setTimeout(() => setStatus(null), 4000);
   } catch (err) {
     console.error("Subscription error:", err);
     setStatus("error");
     setTimeout(() => setStatus(null), 3000);
   }
 };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-foreground/5 border border-border rounded-2xl px-6 md:px-8 py-8 mb-12"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-6">
          Get weekly book recommendations delivered to your inbox
        </p>

        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent-green" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-200"
              disabled={status === "loading"}
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 font-semibold transition-all duration-200"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        {/* Status Messages */}
        {status === "success" && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-accent-green mt-3 justify-center"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm">Successfully subscribed! 🎉</span>
          </MotionDiv>
        )}

        {status === "duplicate" && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-yellow-500 mt-3 justify-center"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">This email is already subscribed!</span>
          </MotionDiv>
        )}

        {status === "error" && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500 mt-3 justify-center"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Please enter a valid email address</span>
          </MotionDiv>
        )}
      </div>
    </MotionDiv>
  );
};

export default NewsletterSignup;
