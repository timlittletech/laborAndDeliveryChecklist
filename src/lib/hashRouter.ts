import { useEffect, useState } from 'react';

function readHash(): string {
  return window.location.hash.replace(/^#/, '');
}

export function useHashTab(defaultTab: string): [string, (id: string) => void] {
  const [tab, setTab] = useState<string>(() => readHash() || defaultTab);

  useEffect(() => {
    const onChange = () => {
      const next = readHash();
      if (next) setTab(next);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = (id: string) => {
    if (id === tab) return;
    window.location.hash = id;
    setTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [tab, navigate];
}
