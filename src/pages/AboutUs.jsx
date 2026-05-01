import { motion } from "framer-motion"
import { BookOpen,  Heart } from "lucide-react"


const MotionDiv = motion.div
const MotionH1 = motion.h1
const MotionSpan = motion.span


const stats = [
  { value: "12+", label: "Books Available" },
  { value: "3", label: "Pages Built" },
  { value: "100%", label: "Free Forever" },
  { value: "∞", label: "Reading Joy" },
]



const AboutUs = () => {
  return (
    <div className="px-6 md:px-10 py-16 min-h-[60vh]">

      {/* Hero Section */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <div className="inline-flex items-center gap-2 bg-accent-green-light text-accent-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <BookOpen className="w-4 h-4" />
          About Book Vibe
        </div>
        <MotionH1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          Discover Books,
          <br />
          <span className="text-accent-green">Love Reading</span>
        </MotionH1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Book Vibe is a free book discovery platform built with passion.
          Find your next favorite book, track your reading list, and
          explore thousands of titles — all in one place.
        </p>
      </MotionDiv>

      {/* Stats */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-muted border border-border rounded-2xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-accent-green mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </MotionDiv>

      {/* Mission */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-10 h-10 text-accent-green mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We believe everyone deserves access to great books. Book Vibe
            makes it easy to discover, organize, and enjoy reading —
            completely free. No subscriptions, no paywalls. Just books
            and the joy of reading.
          </p>
        </div>
      </MotionDiv>

      

    </div>
  )
}

export default AboutUs;