import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="12" width="4" height="9" rx="1" />
              <rect x="10" y="7" width="4" height="14" rx="1" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Headless Chart
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/docs"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-accent-blue"
          >
            Docs
          </Link>
          <a
            href="https://github.com/meursyphus/headless-chart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-accent-blue"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
