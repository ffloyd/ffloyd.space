import type { RequestHandler } from '@sveltejs/kit';
import { text } from '@sveltejs/kit';
import RSS from 'rss';
import thoughts from '../thoughts';

// content of RSS are constant in the scope of deployment
export const prerender = true;

export const GET: RequestHandler = () => {
  const siteUrl = 'https://ffloyd.space';

  const feed = new RSS({
    title: 'Thoughts — ffloyd.space',
    description: 'I think a lot. Here are my thoughts. About technology, life, philosophy.',
    feed_url: `${siteUrl}/thoughts/rss.xml`,
    site_url: `${siteUrl}/thoughts`,
    language: 'en'
  });

  for (const thought of thoughts) {
    const link = `${siteUrl}/thoughts/${thought.slug}`;
    feed.item({
      title: thought.title,
      description: thought.description,
      url: link,
      date: thought.date
    });
  }

  const xml = feed.xml({ indent: true });

  return text(xml, {
    headers: {
      // we use application/xml instead of application/rss+xml
      // because browsers download file when see application/rss+xml,
      // but application/xml is rendered in browser that is more convinient.
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
