# Style Guide

The main source of truth for the design language is `src/routes/layout.css`.
Tailwind v4 and modern CSS features is used to reduce cognitive complexity of the design language.
Support for old browsers is not a priority.

To improve readablity it's advised to use utility and component classes for common patterns with semantic naming instead of raw utility classes (like Tailwind advises by default).

When adjusting the visual language, update `src/routes/layout.css` first, then keep usages across components consistent with those semantics.

Important part is Tailwind Typography plugin configuration and adjustments that is essential for articles perception.

## Default dark theme

**"Space Terminal"** aesthetic — mostly monochromatic, glow-enhanced interactions, minimalistic, with emotional-based non-monochromatic highlights.

## References

There's a list of articles that helped me to form the current design language and approach:

- [About color spaces and perceptual uniformity](https://ericportis.com/posts/2024/okay-color-spaces/) - historical overview of color spaces, way to perceptual uniformity and challenges of color representation. Cool interactive examples. Has a lot of links if you want to dive deeper. It explains why OKLCH is used in my design language.
