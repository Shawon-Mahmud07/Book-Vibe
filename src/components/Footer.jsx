import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-10">
      <div className="px-6 md:px-10 py-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-6 h-6 text-green-500" />
              <span className="text-xl font-bold text-foreground">
                Book Vibe
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover and enjoy thousands of classic books for free. Your
              next great read is just one click away.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Navigate</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-green-500 cursor-pointer transition-colors">Home</li>
                <li className="hover:text-green-500 cursor-pointer transition-colors">Listed Books</li>
                <li className="hover:text-green-500 cursor-pointer transition-colors">Pages to Read</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Source</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a 
                    href="https://gutendex.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-500 transition-colors"
                  >
                    Gutendex API
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gutenberg.org"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-500 transition-colors"
                  >
                    Project Gutenberg
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Book Vibe. Built with ❤️ using React &
          Gutendex.
        </div>
      </div>
    </footer>
  );
};

export default Footer;