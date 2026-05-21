import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, Menu, Moon, Sun, BookOpen, LogOut, User2, Settings 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Listed Books", href: "/listed-books" },
  { name: "Pages to Read", href: "/pages-to-read" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  // ─── States & Hooks ───
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const activePath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  // ─── Close mobile menu on route change safely ───
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // ─── Theme Toggler Logic ───
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  // ─── Logout Handler ───
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-300">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-foreground text-background p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Book Vibe</h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-10">
            {navLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <NavigationMenuItem key={link.name}>
                  <Link
                    to={link.href}
                    className={`relative text-sm font-medium transition-colors duration-200 pb-1 group
                      ${isActive ? "text-accent-green" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300
                        ${isActive ? "w-full bg-accent-green" : "w-0 bg-foreground"}`}
                    />
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden lg:flex items-center gap-3">
        <Link to="/search">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-foreground/10"
          >
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDark}
          className="rounded-full hover:bg-foreground/10"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-muted border border-border rounded-xl px-3 py-1.5 hover:bg-foreground/10 transition-colors duration-200">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || "User"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-accent-green/10 flex items-center justify-center">
                      <User2 className="w-3 h-3 text-accent-green" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground max-w-24 truncate">
                    {currentUser.displayName ||
                      currentUser.email?.split("@")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl mt-1">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-foreground">
                      {currentUser.displayName || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground font-normal truncate">
                      {currentUser.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 cursor-pointer w-full"
                  >
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500 focus:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/signin">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-foreground/5 font-medium px-5 rounded-xl"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-5 rounded-xl">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex lg:hidden items-center gap-2">
        <Link to="/search">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-foreground/10"
          >
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDark}
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>{" "}
          <SheetContent side="right" className="w-72 bg-background p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation links
            </SheetDescription>
            <div className="flex items-center gap-2 p-5 border-b border-border">
              <div className="bg-foreground text-background p-1.5 rounded-lg">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="text-lg font-bold text-foreground">Book Vibe</h1>
            </div>
            <div className="flex flex-col gap-1 p-3 mt-1">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center gap-3 text-sm font-medium px-3 py-3 rounded-xl transition-all duration-200
                      ${isActive ? "bg-foreground text-background" : "text-foreground hover:bg-muted"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${isActive ? "bg-background" : "bg-foreground/20"}`}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border bg-background">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-accent-green/10 flex items-center justify-center">
                        <User2 className="w-4 h-4 text-accent-green" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground truncate">
                      {currentUser.displayName ||
                        currentUser.email?.split("@")[0]}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center gap-2 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Link to="/signin">
                      <Button
                        variant="outline"
                        className="w-full border-border text-foreground hover:bg-foreground/5 rounded-xl"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;