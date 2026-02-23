import { readFile } from "fs/promises";
import { join } from "path";
import { codeToHtml } from "shiki";

export interface ChartContent {
  title: string;
  description: string;
  slug: string;
  category: string;
  body: string;
}

export async function getChartContent(
  contentSlug: string
): Promise<ChartContent | null> {
  try {
    const filePath = join(
      process.cwd(),
      "src",
      "content",
      "charts",
      `${contentSlug}.md`
    );
    const raw = await readFile(filePath, "utf-8");

    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) return null;

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2].trim();

    const meta: Record<string, string> = {};
    for (const line of frontmatter.split("\n")) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > -1) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
        meta[key] = val;
      }
    }

    return {
      title: meta.title || "",
      description: meta.description || "",
      slug: meta.slug || contentSlug,
      category: meta.category || "",
      body,
    };
  } catch {
    return null;
  }
}

interface TableRow {
  area: string;
  prop: string;
  description: string;
}

export function parseCustomizableAreas(body: string): TableRow[] {
  const rows: TableRow[] = [];
  const tableSection = body.match(
    /## Customizable Areas\n\n\|.*\n\|.*\n([\s\S]*?)(?=\n##|\n$|$)/
  );
  if (!tableSection) return rows;

  const lines = tableSection[1].trim().split("\n");
  for (const line of lines) {
    const cols = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length >= 3) {
      rows.push({
        area: cols[0],
        prop: cols[1].replace(/`/g, ""),
        description: cols[2],
      });
    }
  }
  return rows;
}

export async function parseCodeBlocks(
  body: string
): Promise<{ label: string; lang: string; code: string; html: string }[]> {
  const blocks: { label: string; lang: string; code: string; html: string }[] = [];
  const regex = /## (Basic Usage|Customization Example)\n\n```(\w+)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(body)) !== null) {
    const code = match[3].trim();
    const lang = match[2];
    const html = await codeToHtml(code, {
      lang: lang === "tsx" ? "tsx" : lang === "ts" ? "typescript" : lang,
      theme: "github-dark",
    });
    blocks.push({ label: match[1], lang, code, html });
  }
  return blocks;
}

export function parseUseCases(body: string): string[] {
  const section = body.match(/## Use Cases\n\n([\s\S]*?)(?=\n##|$)/);
  if (!section) return [];
  return section[1]
    .trim()
    .split("\n")
    .map((l) => l.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

export function parseDescription(body: string): string {
  const firstParagraph = body.match(/^# .*\n\n([\s\S]*?)(?=\n##)/);
  if (firstParagraph) return firstParagraph[1].trim();
  return "";
}
