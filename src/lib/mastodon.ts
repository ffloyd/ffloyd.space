import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// subset of Mastodon API types for our use case
interface MastodonApiStatus {
  id: string;
  in_reply_to_id: string | null;
  content: string;
  created_at: string;
  url: string;
  account: {
    display_name: string;
    acct: string;
    username: string;
    url: string;
  };
}

// subset of Mastodon API types for our use case
interface MastodonApiContext {
  ancestors: MastodonApiStatus[];
  descendants: MastodonApiStatus[];
}

export interface Comment {
  url: string;
  author: string;
  authorURL: string;
  username: string;
  content: string;
  createdAt: Date;
  replies: Comment[];
}

function stripHTML(html: string): string {
  const sanitized = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(html);

  return sanitized.toString();
}

function buildReplies(statuses: MastodonApiStatus[], parentId: string): Comment[] {
  return statuses
    .filter((status) => status.in_reply_to_id === parentId)
    .map((status) => ({
      url: status.url,
      author: status.account.display_name,
      authorURL: status.account.url,
      username: `@${status.account.username}`,
      content: stripHTML(status.content),
      createdAt: new Date(status.created_at),
      replies: buildReplies(statuses, status.id)
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function loadComments(postId: string): Promise<Comment[]> {
  const response = await fetch(`https://mastodon.social/api/v1/statuses/${postId}/context`);
  const data: MastodonApiContext = await response.json();
  return buildReplies(data.descendants, postId);
}
