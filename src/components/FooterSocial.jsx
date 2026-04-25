import { Globe, Send, BriefcaseBusiness, Mail } from "lucide-react";
import { motion } from "framer-motion";

const MotionA = motion.a;
const SocialLinks = () => {
  const socials = [
    {
      name: "GitHub",
      icon: Globe,
      href: "https://github.com",
      color: "hover:text-foreground",
    },
    {
      name: "Twitter",
      icon: Send,
      href: "https://twitter.com",
      color: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      icon: BriefcaseBusiness,
      href: "https://linkedin.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:hello@bookvibe.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socials.map((social, index) => {
        const Icon = social.icon;
        return (
          <MotionA
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`text-muted-foreground ${social.color} transition-colors duration-300`}
            aria-label={social.name}
          >
            <Icon className="h-5 w-5" />
          </MotionA>
        );
      })}
    </div>
  );
};

export default SocialLinks;
