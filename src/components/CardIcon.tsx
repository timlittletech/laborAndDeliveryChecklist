import { Icon } from '@iconify/react';

// Renders a card/section icon that can be either:
//   - a Solar Iconify name (e.g. "solar:notes-bold-duotone") → rendered as a vector icon
//   - a fun L&D emoji (🌸 🌷 👶 🍼 💗 etc.) → rendered as text
// This keeps the JSON content readable while letting AI-driven UI swap to vector icons
// for the utility/functional concepts.
export function CardIcon({ icon, size = 20, className = '' }: { icon?: string; size?: number; className?: string }) {
  if (!icon) return null;
  if (icon.startsWith('solar:')) {
    return <Icon icon={icon} width={size} className={`opacity-90 ${className}`} aria-hidden="true" />;
  }
  return <span className={`text-[1.1rem] opacity-90 ${className}`} aria-hidden="true">{icon}</span>;
}
