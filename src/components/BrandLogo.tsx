// Compact lockup from brand.html v2.0 — EKG trace flowing into a layered hibiscus bloom,
// paired with the italic-roman "little L&D" wordmark.
// For app icons and favicons, the bloom-only version lives in public/favicon.svg.

export function BrandLogo({ className = 'h-9 w-auto block' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="littleL&D"
    >
      <g transform="translate(6, 32)">
        {/* EKG trace */}
        <path
          d="M 0 0 L 8 0 L 11 -3 L 14 3 L 17 -10 L 20 8 L 23 0 L 32 0 L 35 -8 L 38 5 L 41 -2 L 48 0 L 56 0"
          stroke="#b8456e"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Hibiscus bloom — 5 petals, throat, stamen */}
        <g transform="translate(64 0)">
          <path d="M 0 0 Q -6 -11 -2 -14 Q 3 -13 4 -7 Z" fill="#d63864" />
          <path d="M 0 0 Q 8 -10 11 -6 Q 10 0 5 3 Z" fill="#e84d6f" />
          <path d="M 0 0 Q 11 0 10 8 Q 5 11 1 7 Z" fill="#ff8fa3" />
          <path d="M 0 0 Q 4 10 -2 12 Q -8 9 -6 4 Z" fill="#ff8fa3" />
          <path d="M 0 0 Q -9 4 -10 -2 Q -8 -8 -3 -7 Z" fill="#d63864" />
          <circle r="2.4" fill="#a01b5a" />
          <path
            d="M 0 0 Q 4 -5 5 -7"
            stroke="#e6c850"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="5" cy="-7" r="1.3" fill="#e6c850" />
        </g>
      </g>
      <text
        x="98"
        y="38"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="400"
        fontStyle="italic"
        fontSize="22"
        fill="#4a3a4f"
      >
        little
      </text>
      <text
        x="155"
        y="38"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="22"
        fill="#b8456e"
      >
        L&amp;D
      </text>
    </svg>
  );
}
