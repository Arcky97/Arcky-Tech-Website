import fs from 'fs';
import path from 'path';

export type UpdateEntry = {
  project: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
};

const ROOT = path.join(process.cwd(), "content/documentation");

export function getLatestProjectUpdates(): UpdateEntry[] {
  const updates: UpdateEntry[] = [];

  const projects = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const dir of projects) {
    const updateDir = path.join(ROOT, dir.name, "update-history");

    if (fs.existsSync(updateDir)) {
      const files = fs.readdirSync(updateDir)
        .filter(file => file.endsWith(".mdx") && !file.startsWith('header'))
        .sort()
        .reverse()

      const latestFile = files[0];
      if (latestFile) {
        const filePath = path.join(updateDir, latestFile);
        const rawContent = fs.readFileSync(filePath, "utf-8");

        const title = rawContent.match(/^##\s+(.*)$/m)?.[1]?.trim() ?? "Unknown Update";

        const excerpt = (() => {
          const match = rawContent.match(/(### .*?)(?=\### )/s);

          return match ? match[1].trim() : ""
        })();

        updates.push({
          project: dir.name,
          date: latestFile.replace(".mdx", ""),
          title,
          excerpt,
          slug: `/documentation/${dir.name}/update-history#${latestFile.replace(".mdx", "")}`
        })
      }
    }
  }

  return updates
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .reverse()
}