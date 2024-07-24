import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-primary  text-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg mt-8 mb-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center">
        Welcome to Hacker News Stories
      </h1>
      <p className="mt-4 sm:mt-6 text-center text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
        Discover the latest and greatest top stories from Hacker News. Stay
        updated with the most talked-about topics in the tech world. Whether
        you&apos;re a developer, entrepreneur, or tech enthusiast, our curated
        list of top stories has something for everyone. Check back regularly for
        the freshest updates and join the conversation!
      </p>
      <div className="mt-6 sm:mt-8 text-center">
        <Link
          data-testid="feedback-submit-button"
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          href="/feedback"
        >
          📝 Please leave us your feedback
        </Link>
      </div>
    </div>
  );
};

export default Hero;
