import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "imageMe. | Discover many beautiful photo from around the world",
  description: "Discover many beautiful photo from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider>
          {/* Navigation */}
          <Navbar />

          {children}

          {/* Footer */}
          <Footer />
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
