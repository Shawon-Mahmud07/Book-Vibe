import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import NewsletterSignup from "./FooterNewsletter";
import SocialLinks from "./FooterSocial";
import FooterLinks from "./FooterLinks";
import BackToTopButton from "./BackToTopButton";

const MotionDiv = motion.div;

const Footer = () => {
  return (
    <>
      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="px-6 md:px-10 py-16">
          {/* Newsletter Section */}
          <NewsletterSignup />

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Left — Brand */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-foreground text-background p-2 rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Book Vibe
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Discover and enjoy thousands of classic and modern books for
                free. Your next great read is just one click away.
              </p>
              <SocialLinks />
            </MotionDiv>

            {/* Right — Links */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FooterLinks />
            </MotionDiv>
          </div>

          {/* Bottom Row */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-border pt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Book Vibe. Built with ❤️ using React,
              <a
                href="https://www.tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors ml-1"
              >
                Tailwind CSS
              </a>
              , and
              <a
                href="https://gutendex.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors ml-1"
              >
                Google Books API
              </a>
              .
            </p>
          </MotionDiv>
        </div>
      </footer>
    </>
  );
};

export default Footer;
