import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { StoriesProvider } from "../context/StoriesContext";

export const metadata: Metadata = {
  title: "🧑‍💻 Hacker News App",
  description:
    "Stay updated with the latest tech news, discussions, and trends from the Hacker News community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <StoriesProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </StoriesProvider>
        </div>
      </body>
    </html>
  );
}
