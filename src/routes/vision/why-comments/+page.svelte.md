---
layout: Vision
description: '"Good code does not need comments" is the second "billion dollar mistake" after invention of `nil`. We used to put explanations in all possible places except the code line they relate to.'
---

# Why-Comments Are Good

The mantra "good code does not need comments" has been repeated so many times that it became dogma for many.
But this mantra is fundamentally wrong.
Good code needs good comments, just not the ones that explain _what_ the code does.

My personal experience led me to the idea of **what-comments** and **why-comments**.

**What-comments** are the ones that explain what the code does.
These are often a sign of bad code.
If you can rewrite the code in a way that it's clear what it does without comments, it's usually better to do it.
And this is a common explanation behind the mantra "good code does not need comments".

The second category, **why-comments** explain the reasoning behind decisions.
They answer questions like:

- Why did we choose this approach over alternatives?
- Why does this edge case exist?
- Why is this optimization necessary?

Code shows _what_ happens.
Comments should explain _why_ it happens.
When you return to code after six months, you will understand _what_ it does, but you might not remember _why_ you did it that way.

> The code tells you how, comments should tell you why.

## Example

Completely useless **what-comment**:

```elixir
# Call external service with a timeout of 8000ms and 2 retries
result = call_external_service(timeout: 8000, retries: 2)
```

Helpful **what-comment** that can be easily avoided by improving code readability:

```elixir
# Call external service with a timeout of 8000ms and 2 retries
result = do_call(8000, 2)
```

Useful **why-comment**:

```elixir
# Standard timeout of 5 sec was not enough,
# at the moment of writing up to 10% of calls were longer than 5 sec,
# and 99.9% were shorter than 8 sec.
# 2 retries should be enough to avoid timeout problems.
result = call_external_service(timeout: 8000, retries: 2)
```

This comment is verbose, but can be extremely helpful.
Without such explanation, "8000" can easily become a "magic number" that people are afraid to change for decades.

This is a simple example.
The more complex the decision behind the code, the more helpful and important why-comments are.

## You already do it, just in the wrong place

We already write a lot of "why-comments", but for some reason we put them in many places except the code itself.
To name a few:

- Merge/Pull Request descriptions and comments
- Commit messages
- Task tracker issues
- Wiki (Confluence, Notion, etc.)
- Documentation

I see people (including me) do `git blame` in order to find a related issue that has decision explanation in the comments.
Then do a Slack full-text search to find the discussion that has the reasoning behind the decision.
This is annoying.
Having the explanation right in the code would save a lot of time and energy.
And writing such comments is not expensive.

Why not put explanation right next to the code line that it relates to?
I think now it's obvious that

> **Why-comments** reduce effort needed for deep understanding of the code, both for humans and for AI agents.

In other words, **why-comments** is a good tool to [control cognitive complexity](/vision/cognitive-complexity).

**What-comments**, in contrast, either justify bad code or merely bloats it with redundant information.

:happy[Take care about your colleagues and your future self, write **why-comments** and have more joy in your life!]
