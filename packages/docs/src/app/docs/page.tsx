import Link from "next/link";

export const metadata = {
  title: "Getting Started - Headless Chart",
};

export default function GettingStarted() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Getting Started
      </h1>
      <p className="mt-4 text-lg text-gray-500 leading-relaxed">
        Get up and running with Headless Chart in minutes. Install the packages,
        create your first chart, and learn the core concepts.
      </p>

      {/* Installation */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900">Installation</h2>
        <p className="mt-3 text-sm text-gray-500">
          Headless Chart requires Flitter as the rendering engine and a framework adapter.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl">
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2">
            <span className="text-xs text-gray-400">terminal</span>
          </div>
          <pre className="overflow-x-auto bg-gray-950 p-4 text-sm leading-relaxed">
            <code className="text-gray-200 font-mono">
              npm install headless-chart @meursyphus/flitter @meursyphus/flitter-react
            </code>
          </pre>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Also available via yarn or pnpm.
        </p>
      </section>

      {/* Quick Start */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900">Quick Start</h2>
        <p className="mt-3 text-sm text-gray-500">
          Create your first bar chart in just a few lines. The{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">
            Widget
          </code>{" "}
          component from flitter-react renders any Flitter widget tree as a React element.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl">
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2">
            <span className="text-xs text-gray-400">tsx</span>
          </div>
          <pre className="overflow-x-auto bg-gray-950 p-4 text-sm leading-relaxed">
            <code className="text-gray-200 font-mono">{`import Widget from "@meursyphus/flitter-react";
import { BarChart } from "headless-chart";

function MyChart() {
  return (
    <Widget
      widget={BarChart({
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],
          datasets: [
            { legend: "Revenue", values: [120, 200, 150, 280] },
            { legend: "Expenses", values: [90, 140, 110, 180] },
          ],
        },
        title: "Monthly Overview",
        direction: "vertical",
      })}
      width="600px"
      height="400px"
      renderer="svg"
    />
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Customization */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900">Customization</h2>
        <p className="mt-3 text-sm text-gray-500">
          The <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">custom</code> prop
          lets you override any visual element. Each key maps to a component factory that receives data and configuration.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl">
          <div className="flex items-center gap-2 bg-gray-900 px-4 py-2">
            <span className="text-xs text-gray-400">tsx</span>
          </div>
          <pre className="overflow-x-auto bg-gray-950 p-4 text-sm leading-relaxed">
            <code className="text-gray-200 font-mono">{`import { Container, BoxDecoration, EdgeInsets } from "@meursyphus/flitter";

BarChart({
  data: { labels: ["A", "B", "C"], datasets: [{ legend: "Sales", values: [10, 20, 30] }] },
  custom: {
    bar: ({ value, legend }) =>
      Container({
        margin: EdgeInsets.symmetric({ horizontal: 2 }),
        decoration: new BoxDecoration({
          color: value > 20 ? "#00bd9f" : "#00a9ff",
          borderRadius: BorderRadius.circular(4),
        }),
      }),
  },
})`}</code>
          </pre>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900">Core Concepts</h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="8" width="3" height="7" rx="0.5" fill="#00a9ff" />
                  <rect x="6.5" y="4" width="3" height="11" rx="0.5" fill="#00a9ff" />
                  <rect x="12" y="1" width="3" height="14" rx="0.5" fill="#00a9ff" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Widget-Based Architecture</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every chart is a tree of composable widgets. Each widget handles one
              concern -- a bar, an axis label, a grid line. You can replace any
              widget in the tree while the rest stays intact. This is the same pattern
              used by Flutter and SwiftUI.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#00bd9f" strokeWidth="2" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="#00bd9f" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Headless Approach</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Headless Chart provides the logic and data flow -- you own the
              visuals. There are no hard-coded colors, fonts, or spacing. Every
              aesthetic detail is yours to decide through the{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono">
                custom
              </code>{" "}
              prop.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" stroke="#785fff" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Provider Pattern</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Configuration flows through context providers, similar to React
              Context. This means deeply nested widgets can access chart data,
              scales, and options without prop drilling.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-yellow/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill="#ffb840" />
                  <rect x="9" y="2" width="5" height="5" rx="1" fill="#ffb840" opacity="0.6" />
                  <rect x="2" y="9" width="5" height="5" rx="1" fill="#ffb840" opacity="0.6" />
                  <rect x="9" y="9" width="5" height="5" rx="1" fill="#ffb840" opacity="0.3" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Framework Integration</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Headless Chart is built on{" "}
              <a
                href="https://github.com/nicepkg/flitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                Flitter
              </a>
              , a rendering engine inspired by Flutter. First-class React support
              via{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono">
                @meursyphus/flitter-react
              </code>
              , with secondary Svelte integration.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Charts CTA */}
      <section className="mt-14 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Ready to explore?</h2>
        <p className="mt-2 text-sm text-gray-500">
          Browse all 18 chart types with live demos and full documentation.
        </p>
        <Link
          href="/docs/bar-chart"
          className="mt-5 inline-flex rounded-full bg-accent-blue px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all hover:bg-accent-blue/90"
        >
          View All Charts
        </Link>
      </section>
    </div>
  );
}
