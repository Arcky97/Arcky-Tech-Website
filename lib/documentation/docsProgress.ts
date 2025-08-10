import fs from "fs/promises";
import path from "path";

const MinContentLength = 225;

export interface DocumentationProgress {
  totalFiles: number;
  completeFiles: number;
  incompleteFiles: number;
  percentage: number;
}

export async function getDocumentationProgress(rootDir: string): Promise<Array<{ project: string; progress: DocumentationProgress}>> {
  let totalFiles = 0;
  let completeFiles = 0;
  async function walk(dir: string): Promise<DocumentationProgress> {

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name !== 'header.mdx') {
        totalFiles++;
        try {
          const content = await fs.readFile(fullPath, "utf-8");
          if (content.trim().length >= MinContentLength) {
            completeFiles++;
          } else {
            const currLength = Math.round((content.trim().length / MinContentLength) * 10000) / 10000;
            completeFiles += currLength;
          }
        } catch (error) {
          console.error("Failed to read file:", error);
          // unreadable file = incomplete
        }
      }
    }
    const percentage = totalFiles === 0 ? 0 : Math.round((completeFiles / totalFiles) * 10000) / 100;
    return {
      totalFiles,
      completeFiles: Math.floor(completeFiles),
      incompleteFiles: totalFiles - completeFiles,
      percentage
    }
  }

  const result: Array<{ project: string; progress: DocumentationProgress }> = [];
  const docEntries = await fs.readdir(rootDir, { withFileTypes: true });
  const projects = docEntries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const project of projects) {
    const data = await walk(path.join(rootDir, project));
    result.push({
      project: project.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()),
      progress: data
    })
    totalFiles = 0;
    completeFiles = 0;
  }

  for (const res of result) {
    totalFiles += res.progress.totalFiles;
    completeFiles += res.progress.completeFiles;
  }

  const percentage = totalFiles === 0 ? 0 : Math.round((completeFiles / totalFiles) * 10000) / 100;
  result.unshift({
    project: 'Total',
    progress: {
      totalFiles,
      completeFiles,
      incompleteFiles: totalFiles - completeFiles,
      percentage
    }
  });
  return result;
};