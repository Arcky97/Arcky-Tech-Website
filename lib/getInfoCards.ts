import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), "content/home");

export interface InfoCard {
  content: string;
}

export function getHomeInfoCards(page: string) {
  const infoCards: InfoCard[] = [];

  const pageFiles = fs
    .readdirSync(path.join(ROOT, page))
    .filter(file => file.endsWith('.mdx'));

  for (const file of pageFiles) {
    const filePath = path.join(ROOT, page, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");

    const excerpt = (() => {
      const match = rawContent

      return match;
    })();

    infoCards.push({content: excerpt})
  }

  return infoCards;
}