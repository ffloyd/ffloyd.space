import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const BASE_PATH = 'src/routes/thoughts';

function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function todayDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

async function createThought(title: string, slug: string, description: string) {
  const date = todayDate();
  const dirPath = `${BASE_PATH}/${date}-${slug}`;
  const filePath = `${dirPath}/+page.svelte.md`;

  if (existsSync(dirPath)) {
    console.error(`\nError: Directory already exists: ${dirPath}`);
    process.exit(1);
  }

  await mkdir(dirPath);
  await writeFile(
    filePath,
    `---
layout: Thought
description: ${description}
---

# ${title}
`
  );

  console.log(`\nCreated: ${filePath}`);
}

async function main() {
  const title = prompt('Title:');
  if (!title) {
    throw new Error('Title is required');
  }

  const defaultSlug = slugify(title);
  const slug = prompt(`Slug:`, defaultSlug) as string;

  const description = prompt('First line of description:', '') as string;

  await createThought(title, slug, description);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
