/**
 * Decorative floating stars/sparkles background.
 * Renders across the full page height with fixed positioning so they stay visible while scrolling.
 * Uses pointer-events-none so they don't interfere with interaction.
 */
export default function DecorativeStars() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top area */}
      <span className="absolute top-[5%] left-[8%] text-xl opacity-30 animate-float-slow">✦</span>
      <span className="absolute top-[3%] right-[12%] text-sm opacity-40 animate-sparkle">✧</span>
      <span className="absolute top-[8%] left-[45%] text-base opacity-20 animate-twinkle">✨</span>
      <span className="absolute top-[12%] right-[30%] text-lg opacity-25 animate-float-slow">✦</span>
      <span className="absolute top-[6%] left-[75%] text-xs opacity-35 animate-sparkle">✧</span>

      {/* Upper-middle area */}
      <span className="absolute top-[18%] left-[15%] text-sm opacity-25 animate-twinkle">✧</span>
      <span className="absolute top-[22%] right-[8%] text-base opacity-30 animate-float-slow">✦</span>
      <span className="absolute top-[20%] left-[60%] text-lg opacity-20 animate-sparkle">✨</span>
      <span className="absolute top-[25%] right-[45%] text-xs opacity-40 animate-twinkle">✦</span>
      <span className="absolute top-[28%] left-[5%] text-sm opacity-30 animate-float-slow">✧</span>

      {/* Middle area */}
      <span className="absolute top-[35%] left-[20%] text-base opacity-25 animate-sparkle">✦</span>
      <span className="absolute top-[38%] right-[18%] text-sm opacity-35 animate-twinkle">✧</span>
      <span className="absolute top-[40%] left-[50%] text-xs opacity-20 animate-float-slow">✨</span>
      <span className="absolute top-[42%] right-[60%] text-lg opacity-30 animate-sparkle">✦</span>
      <span className="absolute top-[45%] left-[85%] text-sm opacity-25 animate-twinkle">✧</span>

      {/* Lower-middle area */}
      <span className="absolute top-[52%] left-[10%] text-lg opacity-20 animate-float-slow">✨</span>
      <span className="absolute top-[55%] right-[25%] text-base opacity-30 animate-sparkle">✦</span>
      <span className="absolute top-[58%] left-[40%] text-sm opacity-35 animate-twinkle">✧</span>
      <span className="absolute top-[60%] right-[5%] text-xs opacity-25 animate-float-slow">✦</span>
      <span className="absolute top-[63%] left-[70%] text-base opacity-20 animate-sparkle">✨</span>

      {/* Lower area */}
      <span className="absolute top-[70%] left-[5%] text-sm opacity-30 animate-twinkle">✦</span>
      <span className="absolute top-[72%] right-[15%] text-lg opacity-25 animate-float-slow">✧</span>
      <span className="absolute top-[75%] left-[55%] text-xs opacity-35 animate-sparkle">✨</span>
      <span className="absolute top-[78%] right-[40%] text-base opacity-20 animate-twinkle">✦</span>
      <span className="absolute top-[80%] left-[25%] text-sm opacity-30 animate-float-slow">✧</span>

      {/* Bottom area */}
      <span className="absolute top-[85%] right-[10%] text-base opacity-25 animate-sparkle">✦</span>
      <span className="absolute top-[88%] left-[35%] text-lg opacity-20 animate-twinkle">✧</span>
      <span className="absolute top-[90%] right-[55%] text-sm opacity-35 animate-float-slow">✨</span>
      <span className="absolute top-[93%] left-[80%] text-xs opacity-30 animate-sparkle">✦</span>
      <span className="absolute top-[95%] left-[12%] text-base opacity-25 animate-twinkle">✧</span>
    </div>
  );
}
