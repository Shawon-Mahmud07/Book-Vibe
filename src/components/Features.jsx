import { BookOpen, BookMarked, Star, Clock } from "lucide-react";

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
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">Why Book Vibe?</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Everything you need to discover, organize, and enjoy great books.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
