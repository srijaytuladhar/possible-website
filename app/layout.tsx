import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Possible | Advancing Health Innovation in Nepal",
  description: "Possible is a collaboration advancing health innovation in Nepal through evidence-based integrated care models, co-designing, testing, and scaling community care systems.",
  keywords: ["Possible Health", "Nepal", "Community Health Workers", "Healthcare Innovation", "CHW", "Global Health", "Sambhav Nepal"],
  authors: [{ name: "Possible Health" }],
  openGraph: {
    title: "Possible | Advancing Health Innovation in Nepal",
    description: "Co-designing, testing, and scaling solutions that strengthen community care systems in Nepal.",
    type: "website",
    locale: "en_US",
    url: "https://www.possiblehealth.org",
    siteName: "Possible Health",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-950 selection:bg-primary-pink/10 selection:text-primary-pink">
        <LoadingScreen />
        <Header />
        <div className="flex flex-col flex-grow">
          {children}
        </div>
        <Footer />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
