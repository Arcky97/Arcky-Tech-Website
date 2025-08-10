import fs from 'fs';
import path from 'path';

export type SpeciesEntry = {
  active: string;
  idle: string;
  defeated: string;
}

const ROOT = path.join(process.cwd(), "public/images/scoreboard");

function getImageFilesFromFolder(folderName: string): string[] {
  const folderPath = path.join(ROOT, folderName);
  return fs.readdirSync(folderPath).filter(file => /\.(png|svg)$/i.test(file));
}

function getSpeciesName (fileName: string): string {
  return fileName
    .replace(/^\d{3}-/, "")
    .replace(/\.[^/.]+$/, "");
}

function assignImages(
  files: string[],
  propName: keyof SpeciesEntry,
  speciesMap: Record<string, Partial<SpeciesEntry>>
) {
  for (const file of files) {
    const name = getSpeciesName(file);
    speciesMap[name] = speciesMap[name] || {};
    speciesMap[name][propName] = `/images/scoreboard/${propName}/${file}`;
  }
}

export function getAllSpecies(): Record<string, Partial<SpeciesEntry>> {
  const activeFiles = getImageFilesFromFolder("active");
  const idleFiles = getImageFilesFromFolder("idle");
  const defeatedFiles = getImageFilesFromFolder("defeated");

  const speciesMap: Record<string, Partial<SpeciesEntry>> = {}

  assignImages(activeFiles, "active", speciesMap);
  assignImages(idleFiles, "idle", speciesMap);
  assignImages(defeatedFiles, "defeated", speciesMap);

  return speciesMap;
}