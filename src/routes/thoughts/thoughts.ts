export type ThoughtMeta = {
  slug: string;
  date: string;
  title: string;
  description: string;
};

const articlePagesMap = import.meta.glob<{ title: string; description: string }>(
  './*/*.svelte.md',
  { eager: true }
);

const thoughts: ThoughtMeta[] = Object.entries(articlePagesMap)
  .map(([key, module]) => {
    const slug = key.split('/')[1];
    // YYYY-MM-DD = 10 chars
    const date = slug.slice(0, 10);

    return { slug, date, ...module };
  })
  .filter(({ slug }) => slug[0] !== '_')
  .sort((a, b) => b.date.localeCompare(a.date));

export default thoughts;
