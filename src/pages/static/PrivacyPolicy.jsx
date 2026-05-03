import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const MotionDiv = motion.div;

const sections = [
  {
    title: "Information We Collect",
    content: `Book Vibe collects minimal information to provide you with the best reading experience. We collect information you provide directly, such as when you save books to your reading list. This data is stored locally on your device using browser localStorage and is never transmitted to our servers.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve Book Vibe. Your reading list and preferences are stored locally on your device. We use Google Books API to fetch book information — please refer to Google's Privacy Policy for information about how Google handles data.`,
  },
  {
    title: "Data Storage",
    content: `All personal data including your reading list and theme preferences are stored locally in your browser's localStorage. This means your data never leaves your device. Clearing your browser data will remove all saved preferences.`,
  },
  {
    title: "Third-Party Services",
    content: `Book Vibe uses Google Books API to provide book information and cover images. By using Book Vibe, you agree to Google's Terms of Service and Privacy Policy. We do not share your personal information with any other third parties.`,
  },
  {
    title: "Cookies",
    content: `Book Vibe uses minimal browser storage (localStorage) to remember your preferences such as dark/light mode and your reading list. We do not use tracking cookies or advertising cookies. See our Cookie Policy for more details.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us at hello@bookvibe.com. We take your privacy seriously and will respond to all inquiries within 48 hours.`,
  },
];

const PrivacyPolicy = () => {
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
          <Shield className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          At Book Vibe, we take your privacy seriously. This policy describes
          how we handle your information when you use our service.
        </p>
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

export default PrivacyPolicy;
