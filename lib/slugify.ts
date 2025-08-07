export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g,'')
    .trim()
    .replace(/\s+/g,'-')
}