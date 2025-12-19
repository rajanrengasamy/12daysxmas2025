import type { Metadata } from "next";
import { Playfair_Display, Inter, Crimson_Text } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "12 Days of Memories",
  description: "A festive journey through our year - an interactive advent calendar of cherished memories",
  openGraph: {
    title: "12 Days of Memories",
    description: "A festive journey through our year",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${crimson.variable}`}>
      <body className="font-body antialiased min-h-screen bg-cream-50 text-warm-800">
        {children}
      </body>
    </html>
  );
}
