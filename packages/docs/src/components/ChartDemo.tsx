"use client";

import { useEffect, useState, type ComponentType } from "react";
import { getChartComponent } from "@/lib/chartLoader";

interface ChartDemoProps {
  slug: string;
}

export default function ChartDemo({ slug }: ChartDemoProps) {
  const [ChartComponent, setChartComponent] =
    useState<ComponentType | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const Comp = getChartComponent(slug);
    if (Comp) {
      setChartComponent(() => Comp);
    } else {
      setFailed(true);
    }
  }, [slug]);

  if (failed) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400 text-sm">Chart preview coming soon</p>
      </div>
    );
  }

  if (!ChartComponent) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-accent-blue" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <ChartComponent />
    </div>
  );
}
