import type { RequestHandler } from '@sveltejs/kit';
import { error, text } from '@sveltejs/kit';

import articles from '../../articles.ts';

export const prerender = true;

export function entries() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export const GET: RequestHandler = ({ params }) => {
  const { slug } = params;

  if (!slug || !articles[slug]) {
    error(404, 'Article not found');
  }

  return text(articles[slug].llmText, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
