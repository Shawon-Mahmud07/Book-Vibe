import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { Menu, Moon, Sun, BookOpen } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Listed Books", href: "/listed-books" },
  { name: "Pages to Read", href: "/pages-to-read" },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  // Active path state for link highlighting
  const location = useLocation();
  const activePath = location.pathname;

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
      <div className="hidden md:flex">
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
                      className={`absolute -bottom-1 left-0 h-0.5 bg-foreground rounded-full transition-all duration-300
                        ${isActive ? "w-full bg-accent-green" : "w-0 "}`}
                    />
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-3">
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
        <Button
          variant="outline"
          className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium px-5"
        >
          Sign In
        </Button>
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-5">
          Sign Up
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden items-center gap-2">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
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
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full border-foreground/20 text-foreground hover:bg-foreground/5"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Sign Up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
