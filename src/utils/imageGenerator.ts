// Helper to map and generate high-fidelity forensic SVG image data URIs or return public asset URLs
export function createPhotoSVG(photoUrlOrType: string, title?: string): string {
  const url = photoUrlOrType || '';

  // If a public asset URL is requested and starts with /assets/photos/, return it directly
  if (url.startsWith('/assets/photos/')) {
    return url;
  }

  let innerContent = '';

  if (url.includes('locker_key')) {
    innerContent = `
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="50%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.85)"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111827"/>
      <circle cx="400" cy="300" r="180" fill="#0f172a" opacity="0.6"/>
      <!-- Locker Key #404 -->
      <g transform="translate(260, 200) rotate(-15 140 100)">
        <circle cx="90" cy="100" r="70" fill="none" stroke="url(#metal)" stroke-width="20"/>
        <circle cx="90" cy="100" r="50" fill="#0f172a"/>
        <rect x="15" y="70" width="80" height="60" rx="10" fill="#d97706" opacity="0.9"/>
        <text x="28" y="108" font-family="monospace" font-weight="bold" font-size="22" fill="#111827">#404</text>
        <rect x="150" y="90" width="160" height="20" fill="url(#metal)"/>
        <polygon points="260,90 275,65 290,90" fill="url(#metal)"/>
        <polygon points="295,90 305,60 315,90" fill="url(#metal)"/>
        <polygon points="320,90 330,70 340,90" fill="url(#metal)"/>
      </g>
      <rect width="100%" height="100%" fill="url(#vignette)"/>
      <rect x="20" y="20" width="240" height="40" rx="8" fill="rgba(0,0,0,0.8)" stroke="#ef4444" stroke-width="1.5"/>
      <text x="36" y="45" font-family="sans-serif" font-weight="bold" font-size="13" fill="#fca5a5">EVIDENCE // UNIT_404_KEY</text>
    `;
  } else if (url.includes('shipyard_dock') || url.includes('pier')) {
    innerContent = `
      <defs>
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#030712"/>
          <stop offset="60%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#nightSky)"/>
      <rect y="380" width="800" height="220" fill="#020617"/>
      <polygon points="550,380 620,120 640,120 720,380" fill="#020617"/>
      <polygon points="620,120 780,90 770,110 630,135" fill="#020617"/>
      <rect x="0" y="360" width="480" height="40" fill="#1e293b"/>
      <circle cx="620" cy="115" r="8" fill="#f59e0b"/>
      <circle cx="620" cy="115" r="24" fill="rgba(245,158,11,0.2)"/>
      <rect x="80" y="310" width="140" height="50" fill="#090d16" stroke="#475569" stroke-width="2"/>
      <text x="96" y="342" font-family="sans-serif" font-weight="900" font-size="22" fill="#e2e8f0" letter-spacing="2">PIER 42</text>
      <rect x="20" y="20" width="220" height="40" rx="8" fill="rgba(0,0,0,0.8)" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="36" y="45" font-family="sans-serif" font-weight="bold" font-size="13" fill="#bae6fd">SITE // PIER 42 DOCK</text>
    `;
  } else if (url.includes('vance_tower')) {
    innerContent = `
      <rect width="100%" height="100%" fill="#090d16"/>
      <polygon points="200,600 240,80 560,80 600,600" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      ${Array.from({ length: 14 }).map((_, i) => `<line x1="220" y1="${120 + i * 32}" x2="580" y2="${120 + i * 32}" stroke="rgba(56,189,248,0.2)" stroke-width="1.5"/>`).join('')}
      <text x="270" y="160" font-family="sans-serif" font-weight="900" font-size="24" fill="#38bdf8" letter-spacing="4">VANCE HOLDINGS</text>
      <rect x="20" y="20" width="260" height="40" rx="8" fill="rgba(0,0,0,0.85)" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="36" y="45" font-family="sans-serif" font-weight="bold" font-size="13" fill="#bae6fd">STAKEOUT // VANCE HQ</text>
    `;
  } else if (url.includes('wire_transfer')) {
    innerContent = `
      <rect width="100%" height="100%" fill="#1c1917"/>
      <rect x="80" y="40" width="640" height="520" rx="6" fill="#fafaf9" stroke="#78716c" stroke-width="2"/>
      <text x="120" y="95" font-family="sans-serif" font-weight="900" font-size="20" fill="#0c0a09">OFFSHORE CAYMAN WIRE SLIP</text>
      <line x1="120" y1="110" x2="680" y2="110" stroke="#dc2626" stroke-width="2"/>
      <text x="120" y="150" font-family="sans-serif" font-size="15" fill="#292524">Sender: Helios Holdings Offshore Ltd (Cayman)</text>
      <text x="120" y="180" font-family="sans-serif" font-size="15" fill="#292524">Recipient: City District Council Discretionary Account</text>
      <text x="120" y="210" font-family="sans-serif" font-size="15" fill="#292524">Amount: $25,000.00 USD (Recurring Deposit)</text>
      <text x="120" y="240" font-family="sans-serif" font-size="15" fill="#292524">Date of Initial Wire: September 15 (09/15)</text>
      <text x="120" y="270" font-family="sans-serif" font-size="15" fill="#292524">Memo: JV-KICKBACK-REZONE</text>
      <g transform="translate(420, 310) rotate(-16)">
        <rect x="0" y="0" width="220" height="65" rx="8" fill="none" stroke="#dc2626" stroke-width="4"/>
        <text x="18" y="45" font-family="sans-serif" font-weight="900" font-size="28" fill="#dc2626" letter-spacing="4">EVIDENCE</text>
      </g>
    `;
  } else if (url.includes('pier_cctv')) {
    innerContent = `
      <defs>
        <radialGradient id="cctvcam" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#020617"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#cctvcam)"/>
      <line x1="400" y1="50" x2="400" y2="550" stroke="rgba(16,185,129,0.3)" stroke-width="1" stroke-dasharray="8 6"/>
      <line x1="50" y1="300" x2="750" y2="300" stroke="rgba(16,185,129,0.3)" stroke-width="1" stroke-dasharray="8 6"/>
      <rect x="260" y="260" width="280" height="120" rx="16" fill="#022c22" stroke="#10b981" stroke-width="2"/>
      <circle cx="330" cy="380" r="32" fill="#065f46" stroke="#10b981" stroke-width="2"/>
      <circle cx="470" cy="380" r="32" fill="#065f46" stroke="#10b981" stroke-width="2"/>
      <text x="300" y="320" font-family="monospace" font-weight="bold" font-size="16" fill="#a7f3d0">VANCE SEC // TAG: TX9</text>
      <rect x="20" y="20" width="300" height="40" rx="8" fill="rgba(0,0,0,0.85)" stroke="#10b981" stroke-width="1.5"/>
      <text x="36" y="45" font-family="monospace" font-weight="bold" font-size="13" fill="#a7f3d0">CCTV_CAM_9 // PIER 42 GATE B</text>
    `;
  } else if (url.includes('cartier_receipt')) {
    innerContent = `
      <rect width="100%" height="100%" fill="#1c1917"/>
      <rect x="80" y="40" width="640" height="520" rx="8" fill="#fffbeb" stroke="#b45309" stroke-width="2"/>
      <text x="120" y="95" font-family="serif" font-weight="bold" font-size="26" fill="#78350f" letter-spacing="3">Cartier</text>
      <line x1="120" y1="115" x2="680" y2="115" stroke="#b45309" stroke-width="2"/>
      <text x="120" y="160" font-family="sans-serif" font-size="15" fill="#451a03">Item: Love Bracelet - 18K Rose Gold</text>
      <text x="120" y="195" font-family="sans-serif" font-size="15" fill="#451a03">Purchaser: Liam Thorne (Thorne Capital)</text>
      <text x="120" y="230" font-family="sans-serif" font-size="15" fill="#451a03">Total Charged: $4,500.00 USD</text>
      <text x="120" y="265" font-family="sans-serif" font-size="15" fill="#451a03">Recipient: Chloe V. (St. Regis Suite #1402)</text>
      <text x="120" y="300" font-family="sans-serif" font-size="14" fill="#78350f">Date: Oct 12, 2026 3:30 PM • 5th Ave Flagship</text>
      <g transform="translate(420, 340) rotate(-12)">
        <rect x="0" y="0" width="220" height="60" rx="8" fill="none" stroke="#dc2626" stroke-width="3"/>
        <text x="24" y="42" font-family="sans-serif" font-weight="900" font-size="24" fill="#dc2626" letter-spacing="3">PAID IN FULL</text>
      </g>
    `;
  } else {
    innerContent = `
      <rect width="100%" height="100%" fill="#111827"/>
      <circle cx="400" cy="300" r="100" fill="#1f2937"/>
      <text x="300" y="310" font-family="sans-serif" font-size="20" fill="#9ca3af">${title || 'EVIDENCE PHOTO'}</text>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">${innerContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
