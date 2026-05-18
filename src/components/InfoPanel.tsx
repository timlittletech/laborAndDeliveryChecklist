import { Fragment, type ReactNode } from 'react';
import { parseLabel } from '../lib/parseLabel';

function renderText(text: string): ReactNode {
  // Reuse parseLabel for **bold** support; blanks aren't expected in info panels.
  return parseLabel(text).map((tok, i) => {
    if (tok.kind === 'text') return <Fragment key={i}>{tok.text}</Fragment>;
    if (tok.kind === 'bold') return <strong key={i}>{tok.text}</strong>;
    return <Fragment key={i} />; // blanks ignored here
  });
}

export function InfoPanel({ text }: { text: string }) {
  return (
    <div className="rounded-2xl p-5 mb-6 text-[0.88rem] text-ink border border-pink-200 bg-gradient-to-br from-pink-100 to-lavender-100 [&_strong]:text-pink-700">
      {renderText(text)}
    </div>
  );
}
