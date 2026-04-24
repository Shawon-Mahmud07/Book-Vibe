import BookList from "@/components/BookList";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <BookList />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;