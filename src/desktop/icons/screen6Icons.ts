function createSvgUri(svgContent: string): string {
  const clean = svgContent
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

export const SCREEN6_ICONS = {
  readme: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M14 8 C14 5.79086 15.7909 4 18 4 H38 L50 16 V56 C50 58.2091 48.2091 60 46 60 H18 C15.7909 60 14 58.2091 14 56 Z" fill="#090d16" stroke="#38bdf8" stroke-width="2.5"/>
      <path d="M38 4 V16 H50" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <line x1="22" y1="24" x2="42" y2="24" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="32" x2="42" y2="32" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="40" x2="42" y2="40" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="48" x2="34" y2="48" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      <circle cx="44" cy="48" r="4" fill="#0284c7"/>
      <text x="44" y="51" fill="#ffffff" font-size="7" font-weight="bold" text-anchor="middle" font-family="monospace">!</text>
    </svg>
  `),

  antigravity: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="10" fill="#080c14" stroke="#818cf8" stroke-width="2.5"/>
      <rect x="10" y="12" width="44" height="40" rx="6" fill="#0f172a" stroke="#4f46e5" stroke-width="1.5"/>
      <!-- IDE Header Bar -->
      <rect x="10" y="12" width="44" height="8" rx="2" fill="#1e1b4b"/>
      <circle cx="15" cy="16" r="1.5" fill="#ef4444"/>
      <circle cx="20" cy="16" r="1.5" fill="#f59e0b"/>
      <circle cx="25" cy="16" r="1.5" fill="#10b981"/>
      <!-- IDE Sidebar & Editor Split -->
      <rect x="10" y="20" width="12" height="32" fill="#18182b"/>
      <line x1="22" y1="20" x2="22" y2="52" stroke="#312e81" stroke-width="1"/>
      <!-- Code lines -->
      <path d="M28 28 L32 32 L28 36" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="36" y1="36" x2="46" y2="36" stroke="#a78bfa" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="42" x2="42" y2="42" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="28" y1="46" x2="38" y2="46" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `),

  foundFolder: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M6 16 C6 12.6863 8.68629 10 12 10 H24 L30 16 H52 C55.3137 16 58 18.6863 58 22 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V16 Z" fill="#065f46" stroke="#10b981" stroke-width="2.5"/>
      <path d="M6 24 H58 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V24 Z" fill="#059669"/>
      <!-- Magnifying Glass for 'Found' -->
      <circle cx="30" cy="36" r="7" stroke="#ecfdf5" stroke-width="2.5" fill="#047857"/>
      <line x1="35" y1="41" x2="43" y2="49" stroke="#ecfdf5" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),
};
