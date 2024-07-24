import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="bg-white p-4 border-b-2 border-customBorder">
        <div className="container mx-auto flex justify-center items-center p-4">
          <div className="text-primary text-xl font-bold">
            <Link href="/">Hacker News App</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
