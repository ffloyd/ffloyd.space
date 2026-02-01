---
layout: Vision
description: '"Good code does not need comments" is the second "billion dollar mistake" after invetion of `nil`. We used to put explanations in all possible places except the related code line.'
---

# Why-Comments Are Good

The mantra "good code does not need comments" has been repeated so many times that it became dogma. But this is fundamentally wrong. Good code needs good comments, just not the ones that explain _what_ the code does.

**Why-comments** explain the reasoning behind decisions. They answer questions like:

- Why did we choose this approach over alternatives?
- Why does this edge case exist?
- Why is this optimization necessary?

Code shows what happens. Comments should explain why it happens. When you return to code after six months, you will understand _what_ it does, but you might not remember _why_ you did it that way.

> The code tells you how, comments should tell you why.
