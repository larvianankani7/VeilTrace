function createSvgUri(svgContent: string): string {
  const clean = svgContent
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

export const SCREEN8_ICONS = {
  timer: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="22" fill="#180c10" stroke="#ef4444" stroke-width="2.5"/>
      <path d="M28 8 H36 V12 H28 Z" fill="#ef4444"/>
      <line x1="32" y1="12" x2="32" y2="16" stroke="#ef4444" stroke-width="2.5"/>
      <line x1="44" y1="18" x2="48" y2="14" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="18" x2="16" y2="14" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Clock Hands -->
      <line x1="32" y1="34" x2="32" y2="22" stroke="#fca5a5" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="34" x2="42" y2="34" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="34" r="3" fill="#ffffff"/>
      <path d="M24 46 L40 46" stroke="#f87171" stroke-width="1.5" stroke-dasharray="2 2"/>
    </svg>
  `),

  figma: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="10" fill="#1e1e1e" stroke="#a259ff" stroke-width="2.5"/>
      <!-- Figma Logo Blobs in Center -->
      <rect x="22" y="16" width="10" height="10" rx="5" fill="#f24e1e"/>
      <rect x="32" y="16" width="10" height="10" rx="5" fill="#ff7262"/>
      <rect x="22" y="26" width="10" height="10" rx="5" fill="#a259ff"/>
      <circle cx="37" cy="31" r="5" fill="#1abcfe"/>
      <rect x="22" y="36" width="10" height="10" rx="5" fill="#0acf83"/>
    </svg>
  `),

  whiteboard: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="10" width="52" height="40" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
      <line x1="16" y1="50" x2="12" y2="58" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="48" y1="50" x2="52" y2="58" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="8" y1="50" x2="56" y2="50" stroke="#38bdf8" stroke-width="2"/>
      <!-- Whiteboard Notes / Shapes -->
      <rect x="12" y="16" width="10" height="8" rx="2" fill="#38bdf8" opacity="0.8"/>
      <rect x="26" y="16" width="10" height="8" rx="2" fill="#a855f7" opacity="0.8"/>
      <path d="M22 20 L26 20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M36 20 L40 20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="40" y="16" width="12" height="16" rx="2" fill="#10b981" opacity="0.8"/>
      <line x1="14" y1="32" x2="28" y2="40" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `),
};
