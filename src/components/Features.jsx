import { BookOpen, BookMarked, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
const MotionDiv = motion.div;

// Animation variants — reusable config
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,  // প্রতিটা card 0.15s পরে আসবে
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },   // শুরুতে invisible
  visible: { opacity: 1, y: 0 },   // animate হলে দেখা যাবে
};
const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    title: "Vast Collection",
    description:
      "Access thousands of free classic books from the world's greatest authors — all in one place.",
  },
  {
    icon: <BookMarked className="w-8 h-8 text-green-500" />,
    title: "Build Your Reading List",
    description:
      "Save books you love and create a personal reading list to track your progress.",
  },
  {
    icon: <Star className="w-8 h-8 text-green-500" />,
    title: "Curated Picks",
    description:
      "Discover handpicked classics across genres — fiction, philosophy, science, and more.",
  },
  {
    icon: <Clock className="w-8 h-8 text-green-500" />,
    title: "Read at Your Pace",
    description:
      "No deadlines, no pressure. Pick up where you left off whenever you feel like reading.",
  },
];

const Features = () => {
  return (
    <section className="px-6 md:px-10 py-14">
      {/* Header */}
      <MotionDiv
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-foreground">Why Book Vibe?</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Everything you need to discover, organize, and enjoy great books.
        </p>
      </MotionDiv>

      {/* Cards Grid */}
      <MotionDiv
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <MotionDiv
            key={index}
            variants={cardVariants} 
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6
                       hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="font-bold text-lg text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};

export default Features;
