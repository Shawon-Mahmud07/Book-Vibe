import { motion } from "framer-motion";
import { FileText } from "lucide-react";
const MotionDiv = motion.div;
const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using Book Vibe, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.`,
  },
  {
    title: "Use of Service",
    content: `Book Vibe is a free book discovery platform. You may use this service for personal, non-commercial purposes only. You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.`,
  },
  {
    title: "Intellectual Property",
    content: `Book information, cover images, and descriptions are provided by Google Books API and are subject to Google's Terms of Service. Book Vibe's original code, design, and content are protected by copyright law.`,
  },
  {
    title: "Disclaimer of Warranties",
    content: `Book Vibe is provided on an "as is" basis without any warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or completely secure. Book availability and information accuracy depends on Google Books API.`,
  },
  {
    title: "Limitation of Liability",
    content: `Book Vibe shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.`,
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these terms at any time. We will notify users of significant changes. Your continued use of Book Vibe after changes constitutes acceptance of the new terms.`,
  },
];

const TermsOfService = () => {
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
          <FileText className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Terms of Service
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
          Please read these Terms of Service carefully before using Book Vibe.
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

export default TermsOfService;
