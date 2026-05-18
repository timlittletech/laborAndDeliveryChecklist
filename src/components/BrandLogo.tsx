export function BrandLogo({ className = 'h-8 w-auto block' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(6, 28)">
        <path
          d="M 0 0 L 8 0 L 11 -3 L 14 3 L 17 -10 L 20 8 L 23 0 L 32 0 L 35 -8 L 38 5 L 41 -2 L 48 0 L 54 0"
          stroke="#b8456e"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform="translate(58 0)">
          <ellipse cx="0" cy="-5" rx="2" ry="5" fill="#f4a8be" />
          <ellipse cx="0" cy="-5" rx="2" ry="5" fill="#f4a8be" transform="rotate(72)" />
          <ellipse cx="0" cy="-5" rx="2" ry="5" fill="#f4a8be" transform="rotate(144)" />
          <ellipse cx="0" cy="-5" rx="2" ry="5" fill="#f4a8be" transform="rotate(216)" />
          <ellipse cx="0" cy="-5" rx="2" ry="5" fill="#f4a8be" transform="rotate(288)" />
          <circle r="2" fill="#e6c850" />
        </g>
      </g>
      <text
        x="90"
        y="34"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="400"
        fontStyle="italic"
        fontSize="20"
        fill="#4a3a4f"
      >
        little
      </text>
      <text
        x="133"
        y="34"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="20"
        fill="#b8456e"
      >
        L&amp;D
      </text>
    </svg>
  );
}
