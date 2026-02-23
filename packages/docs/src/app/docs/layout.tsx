"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { charts } from "@/lib/charts";

const categories = [
  {
    label: "Cartesian",
    slugs: charts
      .filter((c) => c.category === "cartesian")
      .map((c) => c.slug),
  },
  {
    label: "Radial",
    slugs: charts.filter((c) => c.category === "radial").map((c) => c.slug),
  },
  {
    label: "Specialized",
    slugs: charts
      .filter(
        (c) =>
          c.category !== "cartesian" && c.category !== "radial"
      )
      .map((c) => c.slug),
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-7xl">
      {/* Sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white md:block">
        <nav className="px-4 py-6">
          {/* Getting Started */}
          <Link
            href="/docs"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/docs"
                ? "border-l-2 border-accent-blue bg-blue-50/60 text-accent-blue"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            Getting Started
          </Link>

          {/* Chart categories */}
          {categories.map((cat) => (
            <div key={cat.label} className="mt-6">
              <h4 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {cat.label}
              </h4>
              <ul className="space-y-0.5">
                {cat.slugs.map((slug) => {
                  const chart = charts.find((c) => c.slug === slug)!;
                  const href = `/docs/${slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={slug}>
                      <Link
                        href={href}
                        className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                          isActive
                            ? "border-l-2 border-accent-blue bg-blue-50/60 font-medium text-accent-blue"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {chart.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
