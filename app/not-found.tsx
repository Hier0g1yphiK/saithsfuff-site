import Link from "next/link";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import DecorativeStars from "@/components/shared/DecorativeStars";

/**
 * Custom 404 page — shown for any unknown route.
 *
 * Uses the standard page shell so lost visitors can navigate back.
 */
export default function NotFound() {
  return (
    <>
      <DecorativeStars />
      <NavBar />
      <main className="section-container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-pink-400 dark:text-lavender-300">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">Oops, this page wandered off!</span>{" "}
          🌙
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-text-body dark:text-gray-200">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-pill bg-gradient-to-r from-pink-400 to-lavender-400 px-8 py-3 font-display text-sm font-semibold text-white shadow-whimsical transition-all hover:scale-105 hover:shadow-glow dark:from-lavender-500 dark:to-pink-500"
        >
          Take me home ✨
        </Link>
      </main>
      <Footer />
    </>
  );
}
