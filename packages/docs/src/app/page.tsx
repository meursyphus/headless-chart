import ChartShowcase from "@/components/ChartShowcase";
import FloatingIcons from "@/components/FloatingIcons";
import { charts } from "@/lib/charts";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Hero */}
      <section className="relative mb-24 min-h-[420px] flex flex-col items-center justify-center text-center">
        <FloatingIcons />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-sm font-medium text-accent-blue mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
            </span>
            18 chart types, fully customizable
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
            Headless{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
              Chart
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-500 leading-relaxed">
            A widget-based chart library built on Flitter. Get building blocks
            instead of black boxes — compose, customize, and own every pixel of
            your charts.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="/docs"
              className="rounded-full bg-accent-blue px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90 hover:shadow-xl hover:shadow-accent-blue/30 hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="https://github.com/meursyphus/headless-chart"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-t-3 border-t-accent-blue border border-gray-100 bg-gradient-to-br from-blue-50/60 to-white p-5 transition-all hover:shadow-md hover:border-t-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="8" width="3" height="7" rx="0.5" fill="#00a9ff" />
              <rect x="6.5" y="4" width="3" height="11" rx="0.5" fill="#00a9ff" />
              <rect x="12" y="1" width="3" height="14" rx="0.5" fill="#00a9ff" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Widget-Based</h3>
          <p className="mt-1 text-xs text-gray-500">
            Override any piece while keeping the rest intact.
          </p>
        </div>
        <div className="rounded-xl border-t-3 border-t-accent-green border border-gray-100 bg-gradient-to-br from-green-50/60 to-white p-5 transition-all hover:shadow-md hover:border-t-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green/10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#00bd9f" strokeWidth="2" fill="none" />
              <circle cx="8" cy="8" r="2" fill="#00bd9f" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Headless</h3>
          <p className="mt-1 text-xs text-gray-500">
            Full control over styling. No opinionated defaults.
          </p>
        </div>
        <div className="rounded-xl border-t-3 border-t-accent-purple border border-gray-100 bg-gradient-to-br from-purple-50/60 to-white p-5 transition-all hover:shadow-md hover:border-t-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/10">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" stroke="#785fff" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Provider Pattern</h3>
          <p className="mt-1 text-xs text-gray-500">
            Configuration flows through context for deep customization.
          </p>
        </div>
      </section>

      {/* Chart Showcase */}
      <section>
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Chart Showcase
          </h2>
          <p className="mt-2 text-base text-gray-400">
            {charts.length} chart types, all fully customizable
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {charts.map((chart, i) => (
            <ChartShowcase
              key={chart.slug}
              title={chart.title}
              slug={chart.slug}
              description={chart.description}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
