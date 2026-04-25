import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Count up hook
const useCountUp = (target, duration = 2) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration });
    return () => controls.stop();
  }, [inView, target, duration]);

  return { rounded, ref };
};

// Individual stat component
const StatCard = ({ stat }) => {
  const { rounded, ref } = useCountUp(stat.countTo, stat.duration);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.4 }}
      className="bg-foreground/5 dark:bg-foreground/10 backdrop-blur-sm rounded-2xl px-6 py-4 text-center lg:text-left"
    >
      <div className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center lg:justify-start gap-0.5">
        {stat.prefix && <span>{stat.prefix}</span>}
        <motion.span>{rounded}</motion.span>
        {stat.suffix && <span>{stat.suffix}</span>}
      </div>
      <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
};

const stats = [
  {
    countTo: 62,
    prefix: "",
    suffix: ",000+",
    label: "Free Books",
    duration: 2,
  },
  {
    countTo: 50,
    prefix: "",
    suffix: "+",
    label: "Genres",
    duration: 2,
  },
  {
    countTo: 100,
    prefix: "",
    suffix: "%",
    label: "Free Forever",
    duration: 2,
  },
];

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const CTASection = () => {
  return (
    <section className="px-6 md:px-10 py-14">
      <div className="relative bg-muted dark:bg-card border border-border rounded-3xl px-8 md:px-16 py-16 overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-foreground rounded-full opacity-5 translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-foreground rounded-full opacity-5 -translate-x-16 translate-y-16" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-foreground rounded-full opacity-5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left — Text */}
          <div className="text-center lg:text-left max-w-xl">
            {/* Badge */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-foreground/10 text-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              100% Free, Always
            </MotionDiv>

            {/* Heading */}
            <MotionH2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4"
            >
              Start Your Reading
              <br />
              Journey Today
            </MotionH2>

            {/* Subtitle */}
            <MotionP
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-base leading-relaxed mb-8"
            >
              Thousands of classic books are waiting for you — completely free.
              No subscription, no sign up. Just read.
            </MotionP>

            {/* Buttons */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-6 py-5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Explore Books
              </Button>
              <Button
                variant="outline"
                className="border-foreground/40 text-foreground hover:bg-foreground/10 px-6 py-5 flex items-center gap-2 bg-transparent"
              >
                View Reading List
                <ArrowRight className="w-4 h-4" />
              </Button>
            </MotionDiv>
          </div>

          {/* Right — Stats */}
          <MotionDiv
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
