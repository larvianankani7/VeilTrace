function createSvgUri(svgContent: string): string {
  const clean = svgContent
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(clean)}`;
}

export const SCREEN4_ICONS = {
  dashboard: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="4" y="8" width="56" height="48" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
      <rect x="10" y="14" width="20" height="16" rx="4" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
      <rect x="34" y="14" width="20" height="26" rx="4" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
      <rect x="10" y="34" width="20" height="16" rx="4" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="20" cy="22" r="4" fill="#38bdf8"/>
      <path d="M38 32 L44 26 L50 32" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
      <rect x="38" y="34" width="4" height="4" fill="#64748b"/>
      <rect x="44" y="34" width="4" height="4" fill="#64748b"/>
    </svg>
  `),

  login: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="10" width="52" height="44" rx="8" fill="#0b1329" stroke="#6366f1" stroke-width="2.5"/>
      <circle cx="32" cy="26" r="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
      <path d="M20 46 C20 38 25 35 32 35 C39 35 44 38 44 46" fill="#4338ca" stroke="#818cf8" stroke-width="2"/>
      <circle cx="48" cy="20" r="5" fill="#f43f5e"/>
      <path d="M47 18 L49 20 L48 22" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `),

  ecom: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="22" y="2" width="20" height="60" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="32" cy="32" r="20" fill="#0f172a" stroke="#fbbf24" stroke-width="3"/>
      <circle cx="32" cy="32" r="16" fill="#182235" stroke="#d97706" stroke-width="1"/>
      <circle cx="32" cy="32" r="2.5" fill="#fef3c7"/>
      <line x1="32" y1="32" x2="32" y2="21" stroke="#fef3c7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="40" y2="32" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
      <circle cx="32" cy="18" r="1.5" fill="#fbbf24"/>
      <circle cx="32" cy="46" r="1.5" fill="#fbbf24"/>
      <circle cx="18" cy="32" r="1.5" fill="#fbbf24"/>
      <circle cx="46" cy="32" r="1.5" fill="#fbbf24"/>
    </svg>
  `),

  personalHu: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="6" width="48" height="52" rx="8" fill="#064e3b" fill-opacity="0.8" stroke="#10b981" stroke-width="2.5"/>
      <rect x="14" y="12" width="36" height="40" rx="5" fill="#022c22" stroke="#34d399" stroke-width="1.5"/>
      <circle cx="32" cy="24" r="7" fill="#065f46" stroke="#6ee7b7" stroke-width="2"/>
      <path d="M22 42 C22 35 26 33 32 33 C38 33 42 35 42 42" fill="#047857" stroke="#6ee7b7" stroke-width="1.8"/>
      <rect x="20" y="44" width="24" height="3" rx="1.5" fill="#a7f3d0"/>
    </svg>
  `),

  passGenerator: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="12" width="52" height="40" rx="8" fill="#1e1035" stroke="#a855f7" stroke-width="2.5"/>
      <circle cx="24" cy="32" r="9" stroke="#c084fc" stroke-width="2.5"/>
      <line x1="33" y1="32" x2="50" y2="32" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/>
      <line x1="43" y1="32" x2="43" y2="38" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/>
      <line x1="48" y1="32" x2="48" y2="37" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M24 20 L26 23 L29 24 L26 25 L24 28 L22 25 L19 24 L22 23 Z" fill="#f0abfc"/>
    </svg>
  `),

  keyVault: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#0f172a" stroke="#06b6d4" stroke-width="2.5"/>
      <rect x="10" y="12" width="44" height="40" rx="6" fill="#162032" stroke="#0891b2" stroke-width="1.5"/>
      <circle cx="32" cy="32" r="14" fill="#082f49" stroke="#22d3ee" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="5" fill="#22d3ee"/>
      <line x1="32" y1="18" x2="32" y2="22" stroke="#67e8f9" stroke-width="2" stroke-linecap="round"/>
      <line x1="32" y1="42" x2="32" y2="46" stroke="#67e8f9" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="32" x2="22" y2="32" stroke="#67e8f9" stroke-width="2" stroke-linecap="round"/>
      <line x1="42" y1="32" x2="46" y2="32" stroke="#67e8f9" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `),

  sentinelAlerts: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#2a0812" stroke="#ef4444" stroke-width="2.5"/>
      <path d="M32 16 L48 44 H16 Z" fill="#450a17" stroke="#f87171" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="32" y1="26" x2="32" y2="34" stroke="#fef2f2" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="39" r="1.8" fill="#fef2f2"/>
      <circle cx="48" cy="16" r="4" fill="#ef4444"/>
    </svg>
  `),

  controlCenter: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#18181b" stroke="#f97316" stroke-width="2.5"/>
      <line x1="16" y1="20" x2="48" y2="20" stroke="#52525b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="26" cy="20" r="5" fill="#ea580c" stroke="#fed7aa" stroke-width="1.5"/>
      <line x1="16" y1="32" x2="48" y2="32" stroke="#52525b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="32" r="5" fill="#ea580c" stroke="#fed7aa" stroke-width="1.5"/>
      <line x1="16" y1="44" x2="48" y2="44" stroke="#52525b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="22" cy="44" r="5" fill="#ea580c" stroke="#fed7aa" stroke-width="1.5"/>
    </svg>
  `),

  gallery: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#064e3b" stroke="#14b8a6" stroke-width="2.5"/>
      <rect x="10" y="12" width="44" height="40" rx="6" fill="#042f2e" stroke="#0d9488" stroke-width="1.5"/>
      <circle cx="22" cy="22" r="5" fill="#fde047"/>
      <path d="M12 46 L26 30 L36 40 L44 32 L52 46 Z" fill="#0f766e" stroke="#2dd4bf" stroke-width="1.5"/>
    </svg>
  `),

  music: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#2e1065" stroke="#ec4899" stroke-width="2.5"/>
      <path d="M22 42 A 6 6 0 1 1 22 30 A 6 6 0 1 1 22 42 Z" fill="#a855f7"/>
      <path d="M42 38 A 6 6 0 1 1 42 26 A 6 6 0 1 1 42 38 Z" fill="#a855f7"/>
      <path d="M25 30 L25 18 L45 14 L45 26" stroke="#f472b6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="25" y1="22" x2="45" y2="18" stroke="#f472b6" stroke-width="3"/>
    </svg>
  `),

  taskManager: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="6" width="44" height="52" rx="8" fill="#0f172a" stroke="#3b82f6" stroke-width="2.5"/>
      <rect x="22" y="2" width="20" height="8" rx="3" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M18 20 L22 24 L30 16" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="34" y1="20" x2="46" y2="20" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M18 34 L22 38 L30 30" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="34" y1="34" x2="46" y2="34" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="18" y="44" width="8" height="8" rx="2" stroke="#64748b" stroke-width="2"/>
      <line x1="34" y1="48" x2="46" y2="48" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `),

  mineFolder: createSvgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <path d="M6 16 C6 12.6863 8.68629 10 12 10 H24 L30 16 H52 C55.3137 16 58 18.6863 58 22 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V16 Z" fill="#eab308" stroke="#ca8a04" stroke-width="2.5"/>
      <path d="M6 24 H58 V48 C58 51.3137 55.3137 54 52 54 H12 C8.68629 54 6 51.3137 6 48 V24 Z" fill="#facc15"/>
      <circle cx="32" cy="38" r="6" fill="#ca8a04"/>
      <circle cx="32" cy="38" r="3" fill="#fef08a"/>
    </svg>
  `),
};
