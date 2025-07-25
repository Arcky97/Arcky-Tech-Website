import fs from 'fs';
import path from 'path';
import { getStyles } from '@/lib/documentation/layoutVariants';
import { slugify } from '@/lib/slugify';
import { generateStaticParams } from '@/lib/documentation/mdxParams';
import DocsTableOfContents from '@/components/DocsTableOfContents';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params
}: {
  params: Promise<{ slug: string[]; }>
}) {
  const { slug } = await params;
  const nestedPath = slug.join('/'); 

  const updatesDir = path.join(
    process.cwd(),
    'content/documentation/', 
    nestedPath
  );

  if (!fs.existsSync(updatesDir)) {
    return (
      notFound()
    );
  }

  const files = fs
    .readdirSync(updatesDir)
    .filter(file => file.endsWith('.mdx'));

  if (files.length === 0) {
    const subFolders = fs
      .readdirSync(updatesDir)
      .filter(name => fs.statSync(path.join(updatesDir, name)).isDirectory());
    
    if (subFolders.length > 0) {
      const firstSub = subFolders[0];
      const firstSubDir = path.join(updatesDir, firstSub);
      const redFiles = fs
        .readdirSync(firstSubDir)
        .filter(file => file.endsWith('.mdx'));

      if (redFiles.length > 0) {
        const newSlug = [...slug, firstSub].join('/');
        redirect(`/documentation/${newSlug}`);
      } else {
        notFound();
      }
    } else {
      notFound();
    }
  }

  const isIndexedFormat = files.filter(file => file !== 'header.mdx').every(file => /^\d{1}-.*\.mdx$/.test(file));

  if (isIndexedFormat) {
    // All files start with index: sort by numeric prefix ascending
    files.sort((a, b) => {
      const indexA = parseInt(a.split('-')[0], 10);
      const indexB = parseInt(b.split('-')[0], 10);
      return indexA - indexB;
    });
  } else {
    // All files are date-formatted: sort by date descending
    files.sort((a, b) => {
      const baseA = a.replace('.mdx', '');
      const baseB = b.replace('.mdx', '');
      const dateA = new Date(baseA.split('-').slice(0, 3).join('-'));
      const dateB = new Date(baseB.split('-').slice(0, 3).join('-'));
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime();
      } else {
        return baseB.localeCompare(baseA);
      }
    });
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(updatesDir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');

      const match = raw.match(/^## (.+)$/m);
      const title = match?.[1] || file.replace('.mdx', '');
      const anchorId = slugify(file.replace('.mdx', ''));

      let Component;
      try {
        const mod = await import(
          `@/content/documentation/${nestedPath}/${file}`
        );
        Component = mod.default;
      } catch (err) {
        console.error(`❌ Error loading MDX file: ${nestedPath}/${file}`, err);
        Component = function FailedToLoadComponent() {
          return (
            <div className="text-red-500 border border-red-500 bg-red-100 p-4 rounded">
              ⚠️ Failed to load <strong>{file}</strong>. Check the MDX syntax or code blocks.
            </div>
          )
        }
      }

      return { name: file.replace('.mdx', ''), title, anchorId, Component }
    })
  );

  const tablePosts = posts.filter(({name}) => name !== 'header');
  const header = posts.filter(({name}) => name === 'header');

  const styles = getStyles(slug);

  return (
    <article key={slug[0]} className={styles.wrapper}>
      {styles.card && <section className="mb-6 w-7/8">
        {header && header.map(({Component}, i) => (
          <div key={i} >
            <Component/>
          </div>
        ))}
        <h1 className="text-2xl lg:text-3xl mt-4 font-bold mb-4">Table of Contents</h1>
        <DocsTableOfContents items={tablePosts.map(({ title, anchorId }) => ({ title, anchorId }))} offset={90}/>
        <hr className="border-gray-600/75 border-t-1 mt-2"></hr>
      </section>}

      <section className={styles.section}>
        {tablePosts.map(({ name, anchorId, Component }, i) => (
          <div key={i} id={anchorId} className={styles.card ?? ''}>
            {styles.date && <h4 className={styles.date}>{name}</h4>}
            <Component/>
          </div>
        ))}
      </section>
    </article>
  )
}

generateStaticParams();