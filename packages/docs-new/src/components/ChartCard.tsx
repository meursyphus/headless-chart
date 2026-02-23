"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import { getChartComponent } from "@/lib/chartLoader";

const accentColors = [
  "#00a9ff",
  "#ffb840",
  "#ff5a46",
  "#00bd9f",
  "#785fff",
  "#f28b8c",
];

const pastelBgs = [
  "rgba(0, 169, 255, 0.04)",
  "rgba(255, 184, 64, 0.04)",
  "rgba(255, 90, 70, 0.04)",
  "rgba(0, 189, 159, 0.04)",
  "rgba(120, 95, 255, 0.04)",
  "rgba(242, 139, 140, 0.04)",
];

interface ChartCardProps {
  title: string;
  slug: string;
  description: string;
  gradient: string;
  index: number;
}

export default function ChartCard({
  title,
  slug,
  description,
  gradient,
  index,
}: ChartCardProps) {
  const [ChartComponent, setChartComponent] =
    useState<ComponentType | null>(null);

  useEffect(() => {
    const Comp = getChartComponent(slug);
    if (Comp) {
      setChartComponent(() => Comp);
    }
  }, [slug]);

  const color = accentColors[index % accentColors.length];
  const bgTint = pastelBgs[index % pastelBgs.length];

  return (
    <Link href={`/docs/${slug}`} className="group block">
      <div
        className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{
          backgroundColor: bgTint,
          borderTopWidth: 3,
          borderTopColor: color,
        }}
      >
        <div
          className={`relative flex h-80 items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden rounded-b-none`}
          style={{
            borderRadius: "0",
          }}
        >
          <div
            className="absolute inset-0 rounded-none"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06)",
            }}
          />
          {ChartComponent ? (
            <div className="relative flex items-center justify-center w-full h-full p-3 pointer-events-none">
              <ChartComponent />
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="opacity-30"
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
              <span
                className="text-sm font-medium opacity-40"
                style={{ color }}
              >
                {title.replace(" Chart", "")}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3
            className="text-sm font-semibold text-gray-900 transition-colors"
            style={{
              // @ts-expect-error CSS custom property
              "--hover-color": color,
            }}
          >
            <span className="group-hover:text-accent-blue transition-colors">
              {title}
            </span>
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
