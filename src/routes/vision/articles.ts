type VisionArticleModule = {
  title: string;
  description: string;
  llmText: string;
};

const articlePagesMap = import.meta.glob<VisionArticleModule>('./*/+page.svelte.md', {
  eager: true
});

const articles: Record<string, VisionArticleModule> = Object.fromEntries(
  Object.entries(articlePagesMap)
    .map(([key, module]) => {
      const slug = key.split('/')[1];
      return [slug, module] as const;
    })
    .filter(([slug]) => slug[0] !== '_')
    // Articles are sorted by title here so consumers don't need to sort independently.
    .sort(([, a], [, b]) => a.title.localeCompare(b.title))
);

export default articles;
