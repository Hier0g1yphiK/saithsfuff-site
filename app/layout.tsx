import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/shared/PasswordGate";

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
  icons: {
    icon: `/images/logo.gif`,
  },
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
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body text-text-body bg-gradient-whimsical min-h-screen antialiased transition-colors duration-300 dark:bg-none dark:bg-[#1a0e2e]">
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  );
}
