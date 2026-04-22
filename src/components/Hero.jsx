import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gray-100  rounded-2xl mx-6 md:mx-6 my-6 px-8 md:px-28 py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      {/* Left Side - Text */}
      <div className="space-y-6 md:space-y-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Books to freshen up <br /> your bookshelf
        </h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 md:py-7 text-base">
          View The List
        </Button>
      </div>

      {/* Right Side - Book Image */}
      <div className="flex justify-center">
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg"
          alt="Featured Book"
          className="w-48 md:w-64 object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
