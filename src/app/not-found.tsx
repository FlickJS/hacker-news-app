import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        404 - Page not found
      </h1>
      <p className="text-base sm:text-lg mb-8 text-center">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
