import BookList from "@/components/BookList";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookList />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;