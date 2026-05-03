import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  User,
  Send,
  BookOpen
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MotionDiv = motion.div;
const MotionA = motion.a;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@bookvibe.com",
    href: "mailto:hello@bookvibe.com",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "Shawon-Mahmud07",
    href: "https://github.com/Shawon-Mahmud07",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/shawon-mahmud007",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Message sent!", {
        description: "We'll get back to you soon.",
        icon: "📬",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="px-6 md:px-10 py-16 min-h-[60vh]">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-accent-green-light text-accent-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <MessageSquare className="w-4 h-4" />
          Get in Touch
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </MotionDiv>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — Contact Info */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Let's talk!
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Whether you have feedback, a bug report, or just want to say hi —
              feel free to reach out. I'll try to respond as soon as possible.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <MotionA
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-accent-green/50 transition-all duration-300 group"
                >
                  <div className="p-3 bg-accent-green-light rounded-xl group-hover:bg-accent-green transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {info.value}
                    </p>
                  </div>
                </MotionA>
              );
            })}
          </div>

          {/* Book Vibe Brand */}
          <div className="bg-muted border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-accent-green" />
              <span className="font-semibold text-foreground">Book Vibe</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A free book discovery platform built with React and powered by
              Google Books API. Open source and always free.
            </p>
          </div>
        </MotionDiv>

        {/* Right — Contact Form */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border rounded-3xl p-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Name <span className="text-accent-green">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-green/30 focus:border-accent-green transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Email <span className="text-accent-green">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-green/30 focus:border-accent-green transition-all duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full h-11 px-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-green/30 focus:border-accent-green transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Message <span className="text-accent-green">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-green/30 focus:border-accent-green transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-semibold flex items-center gap-2 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Contact;
