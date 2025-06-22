import fs from 'fs';
import path from 'path';

import { layoutVariants } from '@/lib/documentation/layoutVariants';
import { slugify } from '@/lib/slugify';
import { dynamicParams, generateStaticParams } from '@/lib/documentation/mdxParams';
import DocsTableOfContents from '@/components/DocsTableOfContents';

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
      <div className="text-3xl font-bold text-white text-center mt-20">
        {slug[0]} folder not found.
      </div>
    );
  }

  const files = fs
    .readdirSync(updatesDir)
    .filter((file) => file.endsWith('.mdx'))
    .sort((a, b) => {
      const baseA = a.replace('.mdx', '');
      const baseB = b.replace('.mdx', '');

      const dateA = new Date(baseA.split('-').slice(0, 3).join('-'));
      const dateB = new Date(baseB.split('-').slice(0, 3).join('-'));

      const isValidDateA = !isNaN(dateA.getTime());
      const isValidDateB = !isNaN(dateB.getTime());

      if (isValidDateA && isValidDateB) {
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
        return baseB.localeCompare(baseA);
      }

      if (isValidDateA) return -1;
      if (isValidDateB) return 1;

      return baseA.localeCompare(baseB);
    });

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
        Component = () => (
          <div className="text-red-500 border border-red-500 bg-red-100 p-4 rounded">
            ⚠️ Failed to load <strong>{file}</strong>. Check the MDX syntax or code blocks.
          </div>
        );
      }

      return { name: file.replace('.mdx', ''), title, anchorId, Component }
    })
  );

  const tablePosts = posts.filter(({name}) => name !== 'header');
  const header = posts.filter(({name}) => name === 'header');

  const styles = layoutVariants[slug[slug.length - 1]] || layoutVariants["default"];

  return (
    <article key={slug[0]} className={styles.wrapper}>
      {styles.card && <section className="mb-6 w-6/8">
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

dynamicParams;