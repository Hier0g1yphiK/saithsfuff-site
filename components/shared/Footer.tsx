/**
 * Site-wide footer rendered at the bottom of every page.
 * The copyright year is computed at build time.
 */
export default function Footer() {
  return (
    <footer className="py-8 text-center font-body text-sm text-text-body dark:text-gray-100">
      <p>© {new Date().getFullYear()} saithsfuff. All rights reserved.</p>
    </footer>
  );
}
