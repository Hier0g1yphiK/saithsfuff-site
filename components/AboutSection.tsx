import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="section-container">
      <div className="whimsical-card decorative-stars">
        {/* Decorative sparkle divider */}
        <div className="sparkle-divider mb-6" />

        {/* Heading */}
        <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-4">
          <span className="gradient-text">Hey, I&apos;m saithsfuff!</span> ✨
        </h2>

        {/* Portrait image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-card overflow-hidden shadow-whimsical-lg border-2 border-pink-100/50 dark:border-lavender-700/30">
            <Image
              src="/images/portrait.png"
              alt="Portrait of saithsfuff"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Bio paragraph */}
        <p className="font-body text-text-body dark:text-gray-100 text-base sm:text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto">
          Welcome to my little corner of the internet! I&apos;m a streamer and content creator
          who loves building cozy communities, sharing laughs, and making every stream feel
          like hanging out with friends. Whether I&apos;m gaming, chatting, or trying something
          completely new — there&apos;s always room for one more in the crew. Come say hi,
          grab a snack, and let&apos;s have some fun together! 💖
        </p>

        {/* Bottom decorative divider */}
        <div className="sparkle-divider mt-6" />
      </div>
    </section>
  );
}
