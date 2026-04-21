import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Listed Books", href: "/listed-books" },
  { name: "Pages to Read", href: "/pages-to-read" },
]

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Book Vibe</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-16">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <a
                  href={link.href}
                  className="text-md font-medium  hover:text-green-500 transition-colors"
                >
                  {link.name}
                </a>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Button className="bg-green-500  hover:bg-green-600">Sign In</Button>
        <Button className="bg-[#59C6D2] hover:bg-[#11bed1]  text-white">
          Sign Up
        </Button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-70">

            {/* Mobile Logo */}
            <div className="border-b p-2 ">
              <h1 className="text-xl font-bold">Book Vibe</h1>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-0.5 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium px-2 py-3 rounded-lg hover:bg-gray-100 hover:text-green-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t my-6"></div>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-3 mx-2">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Sign In
              </Button>
              <Button className="w-full bg-[#59C6D2]  hover:bg-[#11bed1] text-white">
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar
