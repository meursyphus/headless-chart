"use client";

const floatingIcons = [
  // Bar chart icon
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="16" width="6" height="12" rx="1.5" fill="#00a9ff" />
        <rect x="13" y="10" width="6" height="18" rx="1.5" fill="#00a9ff" />
        <rect x="22" y="4" width="6" height="24" rx="1.5" fill="#00a9ff" />
      </svg>
    ),
    top: "8%",
    left: "6%",
    size: 48,
    rotate: -12,
    delay: "0s",
  },
  // Pie chart icon
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4A12 12 0 0 1 28 16H16V4Z"
          fill="#ffb840"
        />
        <path
          d="M16 4A12 12 0 1 0 28 16H16V4Z"
          fill="#ffb840"
          opacity={0.4}
        />
      </svg>
    ),
    top: "5%",
    right: "8%",
    size: 52,
    rotate: 15,
    delay: "0.5s",
  },
  // Line chart icon
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <polyline
          points="4,24 10,16 18,20 28,6"
          stroke="#00bd9f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="4" cy="24" r="2" fill="#00bd9f" />
        <circle cx="10" cy="16" r="2" fill="#00bd9f" />
        <circle cx="18" cy="20" r="2" fill="#00bd9f" />
        <circle cx="28" cy="6" r="2" fill="#00bd9f" />
      </svg>
    ),
    top: "18%",
    right: "3%",
    size: 44,
    rotate: -8,
    delay: "1s",
  },
  // Star / sparkle
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L18.5 12.5L28 16L18.5 19.5L16 30L13.5 19.5L4 16L13.5 12.5L16 2Z"
          fill="#785fff"
        />
      </svg>
    ),
    top: "2%",
    left: "28%",
    size: 28,
    rotate: 20,
    delay: "1.5s",
  },
  // Data point / scatter
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="22" r="3.5" fill="#ff5a46" opacity={0.8} />
        <circle cx="18" cy="10" r="4.5" fill="#ff5a46" opacity={0.6} />
        <circle cx="26" cy="18" r="3" fill="#ff5a46" />
      </svg>
    ),
    bottom: "15%",
    left: "4%",
    size: 42,
    rotate: 5,
    delay: "0.8s",
  },
  // Ruler
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="10" width="28" height="12" rx="2" stroke="#f28b8c" strokeWidth="2" fill="none" />
        <line x1="8" y1="10" x2="8" y2="16" stroke="#f28b8c" strokeWidth="1.5" />
        <line x1="14" y1="10" x2="14" y2="18" stroke="#f28b8c" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="20" y2="16" stroke="#f28b8c" strokeWidth="1.5" />
        <line x1="26" y1="10" x2="26" y2="18" stroke="#f28b8c" strokeWidth="1.5" />
      </svg>
    ),
    bottom: "10%",
    right: "6%",
    size: 46,
    rotate: -18,
    delay: "1.2s",
  },
  // Pencil
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M22 4L28 10L12 26H6V20L22 4Z"
          stroke="#ffb840"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="18" y1="8" x2="24" y2="14" stroke="#ffb840" strokeWidth="1.5" />
      </svg>
    ),
    top: "12%",
    left: "18%",
    size: 32,
    rotate: 25,
    delay: "2s",
  },
  // Gear
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5" stroke="#785fff" strokeWidth="2" fill="none" />
        <path
          d="M16 2V6M16 26V30M2 16H6M26 16H30M5.9 5.9L8.7 8.7M23.3 23.3L26.1 26.1M26.1 5.9L23.3 8.7M8.7 23.3L5.9 26.1"
          stroke="#785fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    bottom: "5%",
    left: "22%",
    size: 36,
    rotate: 10,
    delay: "0.3s",
  },
  // Lightning bolt
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path d="M18 2L8 18H16L14 30L24 14H16L18 2Z" fill="#ffb840" />
      </svg>
    ),
    top: "6%",
    left: "44%",
    size: 30,
    rotate: -10,
    delay: "1.8s",
  },
  // Donut chart
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#00bd9f" strokeWidth="4" fill="none" strokeDasharray="20 50" />
        <circle cx="16" cy="16" r="11" stroke="#00a9ff" strokeWidth="4" fill="none" strokeDasharray="15 55" strokeDashoffset="-20" />
      </svg>
    ),
    top: "3%",
    right: "22%",
    size: 40,
    rotate: 30,
    delay: "0.7s",
  },
  // Arrow up
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 28V6M16 6L8 14M16 6L24 14"
          stroke="#ff5a46"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bottom: "18%",
    right: "18%",
    size: 34,
    rotate: 12,
    delay: "1.4s",
  },
  // Small sparkle
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4L18 13L28 16L18 19L16 28L14 19L4 16L14 13L16 4Z"
          fill="#f28b8c"
        />
      </svg>
    ),
    top: "14%",
    right: "14%",
    size: 24,
    rotate: -5,
    delay: "2.2s",
  },
  // Monitor / screen
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="16" rx="2" stroke="#00a9ff" strokeWidth="2" fill="none" />
        <line x1="12" y1="24" x2="20" y2="24" stroke="#00a9ff" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="20" x2="16" y2="24" stroke="#00a9ff" strokeWidth="2" />
      </svg>
    ),
    bottom: "8%",
    left: "40%",
    size: 38,
    rotate: -6,
    delay: "0.9s",
  },
  // Small diamond
  {
    svg: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="8" width="16" height="16" rx="2" fill="#785fff" opacity={0.6} transform="rotate(45 16 16)" />
      </svg>
    ),
    top: "22%",
    left: "8%",
    size: 26,
    rotate: 0,
    delay: "1.6s",
  },
];

export default function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-60"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            width: icon.size,
            height: icon.size,
            transform: `rotate(${icon.rotate}deg)`,
            animationDelay: icon.delay,
          }}
        >
          {icon.svg}
        </div>
      ))}
    </div>
  );
}
