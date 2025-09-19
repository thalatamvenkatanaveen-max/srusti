import { useMemo } from "react";
import { GiStarsStack, GiNorthStarShuriken, GiStarSwirl } from "react-icons/gi";
import { WiStars } from "react-icons/wi";

/**
 * Sprinkle star/space icons across the screen.
 * Place <DecorativeStars /> inside a relatively positioned container
 * or just use it fixed to cover the entire viewport.
 */
export default function DecorativeStars({
  count = 35, // total icons
  minSize = 40, // px
  maxSize = 66, // px
  padding = 2, // % padding from edges so icons don’t stick to borders
  zIndex = -1, // keep behind your content
  className = "",
}) {
  const Icons = [GiStarsStack, WiStars, GiNorthStarShuriken, GiStarSwirl];

  // Generate once to avoid “jumping” on re-renders
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const Icon = Icons[Math.floor(Math.random() * Icons.length)];
      const top = padding + Math.random() * (100 - padding * 2); // % from top
      const left = padding + Math.random() * (100 - padding * 2); // % from left
      const size = Math.floor(minSize + Math.random() * (maxSize - minSize));
      const rotate = Math.floor(Math.random() * 360);
      const opacity = 0.3 + Math.random() * 0.4; // 0.3–0.7
      const duration = 3 + Math.random() * 6; // 3–9s
      const delay = Math.random() * 4; // 0–4s
      arr.push({ Icon, top, left, size, rotate, opacity, duration, delay });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, minSize, maxSize, padding]);

  return (
    <>
      {/* Simple twinkle animation without editing Tailwind config */}
      <style>{`
        @keyframes twinkle {
          0%   { transform: rotate(var(--rot)) scale(1);   opacity: var(--op); }
          50%  { transform: rotate(calc(var(--rot) + 8deg)) scale(1.05); opacity: calc(var(--op) + 0.15); }
          100% { transform: rotate(var(--rot)) scale(1);   opacity: var(--op); }
        }
      `}</style>

      <div
        className={`pointer-events-none fixed inset-0 ${className}`}
        style={{ zIndex }}
        aria-hidden="true"
      >
        {stars.map((s, idx) => {
          const { Icon, top, left, size, rotate, opacity, duration, delay } = s;
          return (
            <span
              key={idx}
              className="absolute"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                // Use CSS variables so keyframes can read them
                ["--rot"]: `${rotate}deg`,
                ["--op"]: opacity,
                animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
              }}
            >
              <Icon
                style={{
                  width: size,
                  height: size,
                }}
                className="text-gray-200"
              />
            </span>
          );
        })}
      </div>
    </>
  );
}
