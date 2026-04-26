import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'idle', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
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
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
            onClick={handleSubmit}
            type="submit"
            className="h-12 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 font-semibold transition-all duration-200"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </Button>
        </form>

        {/* Status Messages */}
        {status === "success" && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-600 mt-3 justify-center"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm">Successfully subscribed!</span>
          </MotionDiv>
        )}

        {status === "error" && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-600 mt-3 justify-center"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Please enter a valid email</span>
          </MotionDiv>
        )}
      </div>
    </MotionDiv>
  );
};

export default NewsletterSignup;
