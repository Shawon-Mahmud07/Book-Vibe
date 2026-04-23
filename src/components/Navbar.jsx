import { useState, useEffect } from "react";
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
import { Menu,Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Listed Books", href: "/listed-books" },
  { name: "Pages to Read", href: "/pages-to-read" },
];

const Navbar = () => {
// Dark mode
 const [isDark, setIsDark] = useState(() => {
   const saved = localStorage.getItem("theme");
   return saved === "dark";
 });
  // Apply dark mode class to document
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [isDark]);

 // Dark mode toggle
 const toggleDark = () => {
   setIsDark((prev) => !prev);
 };

  return (
    <nav
      className="
      sticky top-0 z-50
      bg-background/80 backdrop-blur-md
      
      flex items-center justify-between
      px-6 md:px-10 py-4
      transition-colors duration-300
    "
    >
      {/* Logo */}
      <h1 className="text-3xl font-bold text-foreground">Book Vibe</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-16">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <a
                  href={link.href}
                  className="text-md font-medium text-foreground hover:text-green-500 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleDark} className="rounded-full">
          {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white">Sign In</Button>
        <Button className="bg-[#59C6D2] hover:bg-[#11bed1] text-white">Sign Up</Button>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleDark} className="rounded-full">
          {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-70 bg-background">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Mobile navigation links</SheetDescription>

            <div className="border-b border-border p-2">
              <h1 className="text-xl font-bold text-foreground">Book Vibe</h1>
            </div>

            <div className="flex flex-col gap-0.5 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium px-2 py-3 rounded-lg text-foreground hover:bg-muted hover:text-green-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="border-t border-border my-6"></div>

            <div className="flex flex-col gap-3 mx-2">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Sign In</Button>
              <Button className="w-full bg-[#59C6D2] hover:bg-[#11bed1] text-white">Sign Up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
