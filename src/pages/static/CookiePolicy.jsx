import { motion } from "framer-motion";
import { Cookie } from "lucide-react";

const MotionDiv = motion.div;

const cookies = [
  {
    name: "theme",
    type: "Preference",
    duration: "Persistent",
    description:
      "Stores your dark/light mode preference so it persists across visits.",
  },
  {
    name: "book-vibe-listed",
    type: "Functional",
    duration: "Persistent",
    description:
      "Stores your reading list locally so your saved books persist across sessions.",
  },
];

const sections = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files stored on your device. Book Vibe uses browser localStorage (similar to cookies) to remember your preferences and reading list.`,
  },
  {
    title: "How We Use Storage",
    content: `We use localStorage exclusively for functional purposes — to remember your theme preference and reading list. We do not use tracking, advertising, or analytics cookies.`,
  },
  {
    title: "Managing Your Preferences",
    content: `You can clear your localStorage data at any time through your browser settings. This will reset your theme to default and clear your reading list. Go to browser Settings → Privacy → Clear browsing data.`,
  },
  {
    title: "Third-Party Cookies",
    content: `Google Books API may set its own cookies when fetching book data. Please refer to Google's Cookie Policy for information about how Google uses cookies.`,
  },
];

const CookiePolicy = () => {
  return (
    <div className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-accent-green-light text-accent-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Cookie className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </MotionDiv>

      {/* Storage Table */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-2xl overflow-hidden mb-10"
      >
        <div className="p-4 border-b border-border bg-muted">
          <h2 className="font-semibold text-foreground">Storage We Use</h2>
        </div>
        <div className="divide-y divide-border">
          {cookies.map((cookie, index) => (
            <div
              key={index}
              className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-1">Name</p>
                <code className="text-sm text-accent-green font-mono">
                  {cookie.name}
                </code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Type</p>
                <p className="text-sm text-foreground">{cookie.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-sm text-foreground">{cookie.duration}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-xs text-muted-foreground mb-1">Purpose</p>
                <p className="text-sm text-muted-foreground">
                  {cookie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MotionDiv>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent-green-light text-accent-green rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default CookiePolicy;
