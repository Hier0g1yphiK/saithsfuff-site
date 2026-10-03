import { contentExamples } from "@/lib/media-kit-data";

/**
 * Builds Instagram's official iframe-embed URL from a reel/post permalink.
 *
 * Instagram serves an embeddable page at `<permalink>embed`, which renders the
 * reel inside an `<iframe>` with no JavaScript. This is deliberately used
 * instead of the `embed.js` blockquote approach: `embed.js` is commonly
 * neutralised by browser tracking protection (Safari ITP, Firefox ETP, Brave
 * shields, uBlock/AdGuard), which serves the script with a 200 but an empty
 * body — the `load` event fires yet `window.instgrm` is never defined, so the
 * blockquotes stay as the raw fallback. The direct iframe has no such
 * dependency and renders reliably on first load and client-side navigation.
 */
function toEmbedUrl(postUrl: string): string {
  const withSlash = postUrl.endsWith("/") ? postUrl : `${postUrl}/`;
  return `${withSlash}embed`;
}

/**
 * Content examples section for the Portfolio/Media Kit page.
 *
 * Renders a set of Instagram reels as official Instagram iframe embeds in a
 * responsive grid. Data is sourced from `lib/media-kit-data.ts`.
 *
 * This is a React Server Component — the iframes are plain markup and need no
 * client-side JavaScript to hydrate.
 *
 * @returns A `<section>` element containing the Instagram embeds grid.
 */
export default function ContentExamples() {
  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Content Examples</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {contentExamples.map((item) => (
          <div
            key={item.postUrl}
            className="whimsical-card flex justify-center overflow-hidden p-2 sm:p-4"
          >
            <iframe
              src={toEmbedUrl(item.postUrl)}
              title="Instagram reel by saithsfuff"
              className="aspect-[9/16] w-full max-w-[400px] rounded-card border-0"
              loading="lazy"
              scrolling="no"
              allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </section>
  );
}
