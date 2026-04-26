import { motion } from "framer-motion"

const MotionDiv = motion.div;
const FooterLinks = () => {
  const sections = [
    {
      title: "Navigate",
      links: [
        { name: "Home", href: "/" },
        { name: "Listed Books", href: "/listed-books" },
        { name: "Pages to Read", href: "/pages-to-read" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ]
    },
    {
      title: "Resources",
      links: [
        { 
          name: "Google Books API", 
          href: "https://developers.google.com/books",
          external: true
        },
      ]
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {sections.map((section, sectionIndex) => (
        <MotionDiv
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
        >
          <h4 className="font-semibold text-foreground mb-4">
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noreferrer" : ""}
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </MotionDiv>
      ))}
    </div>
  )
}

export default FooterLinks