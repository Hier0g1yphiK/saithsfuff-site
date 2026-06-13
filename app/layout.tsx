import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "saithsfuff | Streamer & Content Creator",
  description:
    "Welcome to the whimsical world of saithsfuff — a streamer and content creator sharing fun moments, creative content, and good vibes across Instagram and TikTok.",
  openGraph: {
    title: "saithsfuff | Streamer & Content Creator",
    description:
      "Welcome to the whimsical world of saithsfuff — a streamer and content creator sharing fun moments, creative content, and good vibes.",
    type: "website",
    url: "https://saithsfuff.com",
    siteName: "saithsfuff",
  },
  twitter: {
    card: "summary_large_image",
    title: "saithsfuff | Streamer & Content Creator",
    description:
      "Welcome to the whimsical world of saithsfuff — a streamer and content creator sharing fun moments, creative content, and good vibes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="font-body text-text-body bg-gradient-whimsical min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
