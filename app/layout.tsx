import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinterest Clone",
  description: "Discover many beautiful photo from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {/* Navigation */}
          <Navbar />

          {children}

          {/* Footer */}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
