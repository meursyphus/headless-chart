"use client";

import Link from "next/link";
import { useEffect, useState, useRef, type ComponentType } from "react";
import { getChartComponent } from "@/lib/chartLoader";

const accentColors = [
  "#00a9ff",
  "#ffb840",
  "#ff5a46",
  "#00bd9f",
  "#785fff",
  "#f28b8c",
];

function useInView(threshold = 1.0) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface ChartShowcaseProps {
  title: string;
  slug: string;
  description: string;
  index: number;
}

export default function ChartShowcase({
  title,
  slug,
  description,
  index,
}: ChartShowcaseProps) {
  const [ChartComponent, setChartComponent] =
    useState<ComponentType | null>(null);
  const { ref, inView } = useInView(1.0);

  useEffect(() => {
    if (!inView) return;
    const Comp = getChartComponent(slug);
    if (Comp) {
      setChartComponent(() => Comp);
    }
  }, [slug, inView]);

  const color = accentColors[index % accentColors.length];
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="py-12">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-10 lg:gap-16 transition-all duration-700 ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* Text side */}
        <div className="flex-1 min-w-0 lg:max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block w-1 h-8 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-base text-gray-500 leading-relaxed mb-6">
            {description}
          </p>
          <Link
            href={`/docs/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color }}
          >
            See more
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Chart side */}
        <div className="flex-1 min-w-0 w-full">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: `${color}06`,
              border: `1px solid ${color}15`,
            }}
          >
            <div className="flex items-center justify-center h-80 sm:h-96 p-4">
              {inView && ChartComponent ? (
                <div className="w-full h-full flex items-center justify-center pointer-events-none [&>div]:max-w-full [&>div]:max-h-full">
                  <ChartComponent />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-30">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <rect
                      x="6"
                      y="24"
                      width="8"
                      height="18"
                      rx="2"
                      fill={color}
                    />
                    <rect
                      x="20"
                      y="14"
                      width="8"
                      height="28"
                      rx="2"
                      fill={color}
                    />
                    <rect
                      x="34"
                      y="6"
                      width="8"
                      height="36"
                      rx="2"
                      fill={color}
                    />
                  </svg>
                  <span className="text-sm font-medium" style={{ color }}>
                    {inView ? "Loading..." : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
