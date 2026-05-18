// 8 flower-themed room markers — in-memory patient tracking, no patient data persisted.
// Each room is its own independent checklist state (see RoomContext).

import type { ReactNode } from 'react';

export type RoomBgKey = 'pink' | 'peach' | 'lavender' | 'butter' | 'sky' | 'mauve' | 'rose' | 'mint';

export type RoomDef = {
  id: string;          // url-safe; also used as the room state key
  name: string;        // display name (e.g. "Cosmos")
  bg: RoomBgKey;       // determines the active background + border colors
  Svg: () => ReactNode;
};

// Inline flower SVGs extracted verbatim from the original index.html.
// Keeping them inline (vs. importing static files) keeps the brand assets versioned with the code.

const Cosmos = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <g transform="translate(25 25)">
      <ellipse cx="0" cy="-12" rx="6" ry="11" fill="#f4a8be" />
      <ellipse cx="0" cy="-12" rx="6" ry="11" fill="#e879a0" opacity="0.9" transform="rotate(72)" />
      <ellipse cx="0" cy="-12" rx="6" ry="11" fill="#f4a8be" transform="rotate(144)" />
      <ellipse cx="0" cy="-12" rx="6" ry="11" fill="#e879a0" opacity="0.9" transform="rotate(216)" />
      <ellipse cx="0" cy="-12" rx="6" ry="11" fill="#f4a8be" transform="rotate(288)" />
      <circle r="3.5" fill="#e6c850" />
    </g>
  </svg>
);

const Tulip = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <path d="M 25 30 L 25 44" stroke="#3d8a68" strokeWidth="1.6" strokeLinecap="round" />
    <ellipse cx="20" cy="38" rx="4" ry="1.6" fill="#6cc9a0" transform="rotate(-30 20 38)" />
    <path d="M 14 28 Q 12 18 18 14 Q 21 22 21 28 Z" fill="#f0a878" />
    <path d="M 36 28 Q 38 18 32 14 Q 29 22 29 28 Z" fill="#f0a878" />
    <path d="M 18 28 Q 18 12 25 10 Q 32 12 32 28 Z" fill="#ffd2b5" />
    <path d="M 18 28 Q 18 12 25 10 Q 32 12 32 28 Z" fill="none" stroke="#b56f3d" strokeWidth="0.7" />
  </svg>
);

const Lavender = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <path d="M 25 42 L 25 16" stroke="#6cc9a0" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="25" cy="13" rx="3" ry="4" fill="#9b8cd4" />
    <ellipse cx="21" cy="17" rx="2.8" ry="3.5" fill="#9b8cd4" />
    <ellipse cx="29" cy="17" rx="2.8" ry="3.5" fill="#9b8cd4" />
    <ellipse cx="22" cy="22" rx="2.5" ry="3" fill="#d8d2ef" />
    <ellipse cx="28" cy="22" rx="2.5" ry="3" fill="#d8d2ef" />
    <ellipse cx="25" cy="26" rx="2.2" ry="2.6" fill="#d8d2ef" />
    <ellipse cx="20" cy="36" rx="3.5" ry="1.4" fill="#bce8d4" transform="rotate(-30 20 36)" />
  </svg>
);

const Daisy = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <g transform="translate(25 25)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={`fill-${deg}`}
          cx="0"
          cy="-13"
          rx="3"
          ry="11"
          fill="#fffafc"
          transform={`rotate(${deg})`}
        />
      ))}
      {[0, 45, 90, 135].map((deg) => (
        <ellipse
          key={`stroke-${deg}`}
          cx="0"
          cy="-13"
          rx="3"
          ry="11"
          fill="none"
          stroke="#e6c850"
          strokeWidth="0.6"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="5" fill="#e6c850" />
    </g>
  </svg>
);

const ForgetMeNot = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <g transform="translate(18 18)">
      <circle r="5" fill="#b8d6ed" />
      <circle r="5" fill="#b8d6ed" cx="10" cy="-3" />
      <circle r="5" fill="#b8d6ed" cx="14" cy="6" />
      <circle r="5" fill="#b8d6ed" cx="6" cy="13" />
      <circle r="5" fill="#6ca3d4" cx="-3" cy="6" />
      <circle r="1.5" fill="#faeaa8" />
      <circle r="1.5" fill="#faeaa8" cx="10" cy="-3" />
      <circle r="1.5" fill="#faeaa8" cx="14" cy="6" />
      <circle r="1.5" fill="#faeaa8" cx="6" cy="13" />
      <circle r="1.5" fill="#faeaa8" cx="-3" cy="6" />
    </g>
  </svg>
);

const Sweetpea = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <path
      d="M 12 22 Q 8 15 14 12 Q 19 9 23 14 Q 27 9 32 12 Q 38 15 34 22 Q 38 28 32 30 Q 27 33 23 28 Q 19 33 14 30 Q 8 28 12 22 Z"
      fill="#e3c8de"
    />
    <path
      d="M 12 22 Q 8 15 14 12 Q 19 9 23 14 Q 27 9 32 12 Q 38 15 34 22 Q 38 28 32 30 Q 27 33 23 28 Q 19 33 14 30 Q 8 28 12 22 Z"
      fill="none"
      stroke="#794476"
      strokeWidth="0.7"
    />
    <ellipse cx="23" cy="20" rx="6" ry="4" fill="#b07bac" opacity="0.45" />
    <path d="M 23 30 L 23 42" stroke="#3d8a68" strokeWidth="1.2" />
    <ellipse cx="19" cy="38" rx="3" ry="1.2" fill="#bce8d4" transform="rotate(-30 19 38)" />
  </svg>
);

const Camellia = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <g transform="translate(25 25)">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={`outer-${deg}`} cx="0" cy="-9" rx="7" ry="10" fill="#f7c8d2" transform={`rotate(${deg})`} />
      ))}
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <ellipse key={`inner-${deg}`} cx="0" cy="-5" rx="5" ry="7" fill="#d96a8c" transform={`rotate(${deg})`} />
      ))}
      <circle r="3" fill="#fdf5d4" />
      <circle r="1.5" fill="#e6c850" />
    </g>
  </svg>
);

const Aster = () => (
  <svg viewBox="0 0 50 50" aria-hidden="true">
    <g transform="translate(25 25)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-13"
          rx="1.6"
          ry="11"
          fill="#6cc9a0"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="5" fill="#e6c850" />
    </g>
  </svg>
);

export const ROOMS: RoomDef[] = [
  { id: 'cosmos', name: 'Cosmos', bg: 'pink', Svg: Cosmos },
  { id: 'tulip', name: 'Tulip', bg: 'peach', Svg: Tulip },
  { id: 'lavender', name: 'Lavender', bg: 'lavender', Svg: Lavender },
  { id: 'daisy', name: 'Daisy', bg: 'butter', Svg: Daisy },
  { id: 'forget-me-not', name: 'Forget-me-not', bg: 'sky', Svg: ForgetMeNot },
  { id: 'sweetpea', name: 'Sweetpea', bg: 'mauve', Svg: Sweetpea },
  { id: 'camellia', name: 'Camellia', bg: 'rose', Svg: Camellia },
  { id: 'aster', name: 'Aster', bg: 'mint', Svg: Aster },
];

// Tailwind classes applied to the active room pill, per bg key.
// Inactive pills use border-line bg-white from RoomPicker.
export const ACTIVE_PILL_CLASSES: Record<RoomBgKey, string> = {
  pink: 'bg-pink-100 border-pink-500',
  peach: 'bg-peach-100 border-peach-500',
  lavender: 'bg-lavender-100 border-lavender-500',
  butter: 'bg-butter-100 border-butter-500',
  sky: 'bg-sky-100 border-sky-500',
  mauve: 'bg-mauve-100 border-mauve-500',
  rose: 'bg-rose-100 border-rose-500',
  mint: 'bg-mint-100 border-mint-500',
};
