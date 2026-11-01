function createSvgUri(svgContent: string): string {
  const clean = svgContent
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

export const SCREEN5_ICONS = {
  videos: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="10" width="52" height="44" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="2.5"/>
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#082f49" stroke="#38bdf8" stroke-width="1.5"/>
      <polygon points="26,24 26,40 42,32" fill="#38bdf8"/>
      <circle cx="16" cy="13" r="1.5" fill="#38bdf8"/>
      <circle cx="21" cy="13" r="1.5" fill="#38bdf8"/>
      <circle cx="26" cy="13" r="1.5" fill="#38bdf8"/>
    </svg>
  `),

  docs: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M14 8 C14 5.79086 15.7909 4 18 4 H38 L50 16 V56 C50 58.2091 48.2091 60 46 60 H18 C15.7909 60 14 58.2091 14 56 Z" fill="#0f172a" stroke="#3b82f6" stroke-width="2.5"/>
      <path d="M38 4 V16 H50" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <line x1="22" y1="24" x2="42" y2="24" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="32" x2="42" y2="32" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="40" x2="42" y2="40" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="48" x2="34" y2="48" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `),

  presentations: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="38" rx="6" fill="#1e1022" stroke="#f97316" stroke-width="2.5"/>
      <line x1="32" y1="46" x2="32" y2="58" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="58" x2="44" y2="58" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
      <rect x="14" y="16" width="16" height="22" rx="3" fill="#431407" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="22" cy="24" r="4" fill="#fdba74"/>
      <rect x="34" y="18" width="16" height="4" rx="2" fill="#fdba74"/>
      <rect x="34" y="26" width="12" height="3" rx="1.5" fill="#fed7aa"/>
      <rect x="34" y="32" width="14" height="3" rx="1.5" fill="#fed7aa"/>
    </svg>
  `),

  excels: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="6" width="48" height="52" rx="8" fill="#022c22" stroke="#10b981" stroke-width="2.5"/>
      <rect x="14" y="12" width="36" height="40" rx="4" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
      <line x1="14" y1="22" x2="50" y2="22" stroke="#10b981" stroke-width="1.5"/>
      <line x1="14" y1="32" x2="50" y2="32" stroke="#10b981" stroke-width="1.5"/>
      <line x1="14" y1="42" x2="50" y2="42" stroke="#10b981" stroke-width="1.5"/>
      <line x1="26" y1="12" x2="26" y2="52" stroke="#10b981" stroke-width="1.5"/>
      <line x1="38" y1="12" x2="38" y2="52" stroke="#10b981" stroke-width="1.5"/>
      <rect x="16" y="24" width="8" height="6" fill="#6ee7b7" opacity="0.4"/>
      <rect x="28" y="34" width="8" height="6" fill="#6ee7b7" opacity="0.7"/>
    </svg>
  `),

  footprintLog: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="6" width="52" height="52" rx="10" fill="#0f172a" stroke="#8b5cf6" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="18" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3 3"/>
      <circle cx="32" cy="32" r="10" stroke="#c4b5fd" stroke-width="1.5"/>
      <circle cx="32" cy="32" r="3" fill="#8b5cf6"/>
      <path d="M28 20 C26 22 25 25 26 27 C27 29 29 28 30 26 C31 24 30 21 28 20 Z" fill="#ddd6fe"/>
      <circle cx="28" cy="18" r="1.5" fill="#ddd6fe"/>
      <path d="M35 36 C33 38 32 41 33 43 C34 45 36 44 37 42 C38 40 37 37 35 36 Z" fill="#a78bfa"/>
      <circle cx="35" cy="34" r="1.5" fill="#a78bfa"/>
    </svg>
  `),

  ledger: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="6" width="48" height="52" rx="6" fill="#1c1917" stroke="#eab308" stroke-width="2.5"/>
      <rect x="14" y="10" width="36" height="44" rx="4" fill="#292524" stroke="#ca8a04" stroke-width="1.5"/>
      <line x1="20" y1="18" x2="44" y2="18" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="26" x2="36" y2="26" stroke="#a8a29e" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="26" x2="44" y2="26" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="34" x2="36" y2="34" stroke="#a8a29e" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="34" x2="44" y2="34" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="42" x2="44" y2="42" stroke="#eab308" stroke-width="1.5"/>
      <path d="M22 48 L27 45 L32 48 L37 44 L42 47" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),

  calendar: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="12" width="52" height="46" rx="8" fill="#0f172a" stroke="#ec4899" stroke-width="2.5"/>
      <path d="M6 20 C6 15.5817 9.58172 12 14 12 H50 C54.4183 12 58 15.5817 58 20 V24 H6 V20 Z" fill="#be185d"/>
      <line x1="18" y1="6" x2="18" y2="14" stroke="#f472b6" stroke-width="3" stroke-linecap="round"/>
      <line x1="46" y1="6" x2="46" y2="14" stroke="#f472b6" stroke-width="3" stroke-linecap="round"/>
      <circle cx="18" cy="32" r="3" fill="#f472b6"/>
      <circle cx="27" cy="32" r="3" fill="#f472b6"/>
      <circle cx="36" cy="32" r="3" fill="#f472b6"/>
      <circle cx="45" cy="32" r="3" fill="#f472b6"/>
      <circle cx="18" cy="42" r="3" fill="#f472b6"/>
      <circle cx="27" cy="42" r="3" fill="#f472b6"/>
      <circle cx="36" cy="42" r="4" fill="#fb7185" stroke="#fff" stroke-width="1.5"/>
      <circle cx="45" cy="42" r="3" fill="#f472b6"/>
      <circle cx="18" cy="50" r="3" fill="#f472b6"/>
      <circle cx="27" cy="50" r="3" fill="#f472b6"/>
    </svg>
  `),

  calc: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="6" width="44" height="52" rx="8" fill="#18181b" stroke="#06b6d4" stroke-width="2.5"/>
      <rect x="16" y="12" width="32" height="12" rx="3" fill="#042f2e" stroke="#14b8a6" stroke-width="1.5"/>
      <text x="44" y="21" fill="#5eead4" font-family="monospace" font-size="10" font-weight="bold" text-anchor="end">734.00</text>
      <circle cx="20" cy="31" r="3" fill="#3f3f46"/>
      <circle cx="28" cy="31" r="3" fill="#3f3f46"/>
      <circle cx="36" cy="31" r="3" fill="#3f3f46"/>
      <circle cx="44" cy="31" r="3" fill="#0ea5e9"/>
      <circle cx="20" cy="39" r="3" fill="#3f3f46"/>
      <circle cx="28" cy="39" r="3" fill="#3f3f46"/>
      <circle cx="36" cy="39" r="3" fill="#3f3f46"/>
      <circle cx="44" cy="39" r="3" fill="#0ea5e9"/>
      <circle cx="20" cy="47" r="3" fill="#3f3f46"/>
      <circle cx="28" cy="47" r="3" fill="#3f3f46"/>
      <circle cx="36" cy="47" r="3" fill="#22c55e"/>
      <circle cx="44" cy="47" r="3" fill="#0ea5e9"/>
    </svg>
  `),

  routeTrace: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#030712" stroke="#6366f1" stroke-width="2.5"/>
      <circle cx="20" cy="22" r="5" fill="#4338ca" stroke="#818cf8" stroke-width="2"/>
      <circle cx="44" cy="22" r="5" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
      <circle cx="32" cy="42" r="6" fill="#4f46e5" stroke="#a5b4fc" stroke-width="2"/>
      <line x1="24" y1="24" x2="28" y2="38" stroke="#818cf8" stroke-width="2" stroke-dasharray="3 2"/>
      <line x1="40" y1="24" x2="35" y2="38" stroke="#6366f1" stroke-width="2" stroke-dasharray="3 2"/>
      <line x1="25" y1="22" x2="39" y2="22" stroke="#a5b4fc" stroke-width="2"/>
      <circle cx="32" cy="42" r="2" fill="#ffffff"/>
    </svg>
  `),

  permits: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M32 6 L52 14 V32 C52 44 43 54 32 58 C21 54 12 44 12 32 V14 Z" fill="#172554" stroke="#3b82f6" stroke-width="2.5"/>
      <circle cx="32" cy="28" r="8" fill="#1e40af" stroke="#93c5fd" stroke-width="2"/>
      <path d="M26 44 C26 39 29 37 32 37 C35 37 38 39 38 44" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
      <circle cx="32" cy="27" r="2.5" fill="#60a5fa"/>
    </svg>
  `),

  signalMemory: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="10" width="48" height="44" rx="6" fill="#0a0a0a" stroke="#14b8a6" stroke-width="2.5"/>
      <rect x="14" y="16" width="36" height="32" rx="3" fill="#134e4a" stroke="#2dd4bf" stroke-width="1.5"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke="#5eead4" stroke-width="2"/>
      <circle cx="32" cy="32" r="6" fill="#042f2e" stroke="#5eead4" stroke-width="2"/>
      <circle cx="32" cy="32" r="2" fill="#5eead4"/>
      <path d="M24 24 C28 20 36 20 40 24" stroke="#5eead4" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 19 C27 14 37 14 44 19" stroke="#99f6e4" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `),

  memoFolder: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M6 16 C6 12.6863 8.68629 10 12 10 H24 L30 16 H52 C55.3137 16 58 18.6863 58 22 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V16 Z" fill="#ca8a04" stroke="#a16207" stroke-width="2.5"/>
      <path d="M6 24 H58 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V24 Z" fill="#eab308"/>
      <rect x="22" y="28" width="20" height="16" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
      <line x1="26" y1="33" x2="38" y2="33" stroke="#854d0e" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="26" y1="38" x2="34" y2="38" stroke="#854d0e" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `),
};
