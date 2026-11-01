function createSvgUri(svgContent: string): string {
  const clean = svgContent
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

export const SCREEN7_ICONS = {
  nearbyDevices: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#0c1929" stroke="#38bdf8" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <path d="M22 22 A14 14 0 0 1 42 22" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M16 16 A22 22 0 0 1 48 16" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 42 A14 14 0 0 0 42 42" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M16 48 A22 22 0 0 0 48 48" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="2" fill="#ffffff"/>
    </svg>
  `),

  boundaryFirewall: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M32 6 L52 14 V32 C52 45 42 55 32 58 C22 55 12 45 12 32 V14 Z" fill="#1e1022" stroke="#f43f5e" stroke-width="2.5"/>
      <path d="M32 14 L44 20 V32 C44 40 38 47 32 49 C26 47 20 40 20 32 V20 Z" fill="#3f0714" stroke="#fb7185" stroke-width="1.5"/>
      <!-- Flame / Shield core -->
      <path d="M32 24 C30 28 26 31 28 36 C30 40 34 40 36 37 C38 34 35 32 35 29 C37 31 38 34 37 37" stroke="#fda4af" stroke-width="2" stroke-linecap="round"/>
      <circle cx="32" cy="36" r="2" fill="#f43f5e"/>
    </svg>
  `),

  envCabinet: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="10" width="48" height="44" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke="#059669" stroke-width="2"/>
      <line x1="8" y1="38" x2="56" y2="38" stroke="#059669" stroke-width="2"/>
      <!-- Drawer Handles -->
      <rect x="26" y="15" width="12" height="4" rx="2" fill="#34d399"/>
      <rect x="26" y="29" width="12" height="4" rx="2" fill="#34d399"/>
      <rect x="26" y="43" width="12" height="4" rx="2" fill="#34d399"/>
      <circle cx="14" cy="17" r="1.5" fill="#10b981"/>
      <circle cx="14" cy="31" r="1.5" fill="#10b981"/>
      <circle cx="14" cy="45" r="1.5" fill="#10b981"/>
    </svg>
  `),

  echoLogs: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="10" fill="#08182b" stroke="#0ea5e9" stroke-width="2.5"/>
      <!-- Snowflake shape -->
      <line x1="32" y1="18" x2="32" y2="46" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="22" x2="42" y2="42" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="22" x2="22" y2="42" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Snowflake branches -->
      <path d="M28 20 L32 24 L36 20" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M28 44 L32 40 L36 44" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M20 28 L24 32 L20 36" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M44 28 L40 32 L44 36" stroke="#7dd3fc" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="4" fill="#0284c7" stroke="#e0f2fe" stroke-width="1.5"/>
    </svg>
  `),

  originGate: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#180e29" stroke="#a855f7" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="16" stroke="#c084fc" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="7" ry="16" stroke="#c084fc" stroke-width="1.5"/>
      <line x1="16" y1="32" x2="48" y2="32" stroke="#c084fc" stroke-width="1.5"/>
      <!-- Gate portal posts -->
      <rect x="12" y="14" width="4" height="36" rx="2" fill="#a855f7"/>
      <rect x="48" y="14" width="4" height="36" rx="2" fill="#a855f7"/>
      <line x1="14" y1="18" x2="50" y2="18" stroke="#e9d5ff" stroke-width="2"/>
    </svg>
  `),

  dataFolder: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M6 16 C6 12.6863 8.68629 10 12 10 H24 L30 16 H52 C55.3137 16 58 18.6863 58 22 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V16 Z" fill="#1e1b4b" stroke="#6366f1" stroke-width="2.5"/>
      <path d="M6 24 H58 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V24 Z" fill="#312e81"/>
      <!-- Database cylinder in folder -->
      <ellipse cx="32" cy="32" rx="10" ry="3.5" fill="#6366f1" stroke="#a5b4fc" stroke-width="1.5"/>
      <path d="M22 32 V40 C22 42 26.5 43.5 32 43.5 C37.5 43.5 42 42 42 40 V32" fill="#4338ca" stroke="#a5b4fc" stroke-width="1.5"/>
      <ellipse cx="32" cy="40" rx="10" ry="3.5" stroke="#a5b4fc" stroke-width="1.5"/>
    </svg>
  `),
};
