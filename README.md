# ffloyd.space

Personal website.
A website with a collection of things I've built, written, or found interesting.

## Development

The project is built with SvelteKit, TailwindCSS, and Bun as runtime and dependency manager.

Use the following commands for development:

- `bun run dev` - Start development server with hot reloading
- `bun test` - Run unit tests
- `bun run build` - Build for production (useful as a test of successful compilation)
- `bun run preview` - Preview production build locally (no hot reloading)
- `bun run lint` - Run all linters
- `bun run format` - Format all files

## Idea

Instead of using some CMS or blog-posting tool like Hugo, I want more flexibility and preferred to use:

- Svelte / SvelteKit as a runtime to not lock-in in static pages only. I can do interactive things more easily if needed.
- Markdown for writing posts, as it's simple and widely supported. A custom Markdown preprocessor is used to have Markdown as a natural part of the codebase and be able to mix Svelte components in it.
