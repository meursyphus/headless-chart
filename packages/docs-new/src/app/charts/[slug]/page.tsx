import { notFound } from "next/navigation";
import Link from "next/link";
import { charts } from "@/lib/charts";
import {
  getChartContent,
  parseCustomizableAreas,
  parseCodeBlocks,
  parseUseCases,
  parseDescription,
} from "@/lib/markdown";
import ChartDemo from "@/components/ChartDemo";

interface ChartPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return charts.map((chart) => ({ slug: chart.slug }));
}

export async function generateMetadata({ params }: ChartPageProps) {
  const { slug } = await params;
  const chart = charts.find((c) => c.slug === slug);
  if (!chart) return {};
  return {
    title: `${chart.title} - Headless Chart`,
    description: chart.description,
  };
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { slug } = await params;
  const chart = charts.find((c) => c.slug === slug);

  if (!chart) {
    notFound();
  }

  const contentSlug = slug.replace(/-chart$/, "");
  const content = await getChartContent(contentSlug);

  const areas = content ? parseCustomizableAreas(content.body) : [];
  const codeBlocks = content ? await parseCodeBlocks(content.body) : [];
  const useCases = content ? parseUseCases(content.body) : [];
  const longDescription = content ? parseDescription(content.body) : "";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link
          href="/"
          className="transition-colors hover:text-accent-blue"
        >
          Charts
        </Link>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-300">
          <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-gray-600">{chart.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 mb-4">
          {chart.category}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {chart.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-500 leading-relaxed">
          {longDescription || chart.description}
        </p>
      </div>

      {/* Chart Demo */}
      <div className={`relative rounded-2xl border border-gray-100 bg-gradient-to-br ${chart.gradient} p-6 mb-12`}>
        <div className="flex h-[400px] items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm">
          <ChartDemo slug={slug} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Use Cases */}
          {useCases.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h2>
              <ul className="space-y-2">
                {useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                    {uc}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Customizable Areas */}
          {areas.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Customizable Areas
              </h2>
              <div className="overflow-x-auto overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-700">Area</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Prop</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {areas.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 text-gray-900 font-medium">{row.area}</td>
                        <td className="px-4 py-3">
                          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-accent-purple">
                            {row.prop}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Code Examples */}
          {codeBlocks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Code Examples
              </h2>
              <div className="space-y-6">
                {codeBlocks.map((block, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      {block.label}
                    </h3>
                    <div className="overflow-hidden rounded-xl [&_pre]:!rounded-none [&_pre]:!m-0 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:font-mono">
                      <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
                        <span className="text-xs text-gray-400">{block.lang}</span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: block.html }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Fallback when no content */}
          {!content && (
            <section className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
              <p className="text-gray-400 text-sm">
                Detailed documentation for this chart is being written.
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Info</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-400">Category</dt>
                <dd className="font-medium text-gray-700 capitalize">{chart.category}</dd>
              </div>
              <div>
                <dt className="text-gray-400">Import</dt>
                <dd>
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">
                    {`import { ${chart.title.replace(/ /g, "")} } from "headless-chart"`}
                  </code>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/meursyphus/headless-chart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link
                  href="/getting-started"
                  className="text-accent-blue hover:underline"
                >
                  Getting Started Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
