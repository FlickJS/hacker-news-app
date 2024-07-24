import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-mainBackgroundColor p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            &copy; 2024 Hacker News App. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center text-white space-y-2 md:space-y-0 md:space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span>Home</span>
          </Link>
          <Link href="/feedback" className="flex items-center space-x-2">
            <FaEnvelope />
            <span>Leave us feedback</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
