---
layout: Thought
description: Agents, skills, memories... aren't we overcomplicating? What if I show, that you can replace them with investments into high quality?
post_id: '116148192752524173'
---

# It's Just Docs

How would you name an artifact with the following traits?

- It's a human-readable text, mostly in English (or other natural language).
- It's part of your codebase or a codebase you depend on.
- It describes how to use your code, how your code works and why it works in this particular way.
- It may contain examples and conventions essential for contributing to the codebase.

Documentation and comments, right?

What I recently realized is that the same traits apply to LLM's "prompts", "agents", "skills", "memories" and so on.
If you replace those buzzwords with "docs", many things start to make more sense and look more funny.

For example:

> LLM ~agents~ :stoic[with proper documentation] can handle a wide range of tasks, from generating code from natural language specifications and analyzing large datasets to summarizing legal documents and conducting legal research.

Or:

> ~Skill~ :stoic[Documentation] gives LLM specialized capabilities for specific tasks. Think of it as "expertise packages" that LLM can discover and load dynamically.

See?
It's just docs.

## Ok, It's a Bit More Than Just Docs

You probably noticed that I'm cheating a bit here.
For example, I cannot do the same trick with the following sentence:

> LLM can start agent that uses skill that starts another agent.

It'd be really embarrassing to find that we invented multiple buzzwords just to rename "docs" and make it sound more fancy, wouldn't it?

The secret ingredient that differs _"agent"_ from _"documentation"_ is **"orchestration"**: how and when you provide docs and examples into LLM context.
In other words, it's a way to optimize exposure of complex context to an LLM.
A way to control cognitive complexity and to keep LLM focused on the task at hand.

Let's replace LLM with "an engineer" in the previous paragraph:

> ... it's a way to optimize exposure of complex context to :happy[an engineer].
> A way to control cognitive complexity and to keep :happy[an engineer] focused on the task at hand.

What text above could describe?

My answer is: _a high-quality codebase_ with well-structured documentation, examples, plenty of useful [why-comments](/vision/why-comments), optimized for [the process of understanding](/vision/cognitive-complexity) and contributing.

It means, that we need this "orchestration" because our existing code and docs are not good enough to naturally provide proper cognitive context gradual exposure.
Pretty interesting angle, isn't it?

These substitution exercises led me to an insight:

## Now is The Best Time for Making High-Quality Software

My theory, is that high-quality codebase, a meticulously crafted one, done with :stoic[deep _understanding_ of the problem domain], is what both LLMs and :happy[humans] truly need to perform at their best.

Using 3rd-party agents, skills, etc - is just like copy-pasting documentation from other codebases.
It works only if their "docs" are better than yours, and if they are _relevant_ to your problem domain.

But **full potential** will be achieved, only when you have a well-crafted codebase with high-quality documentation, examples and comments.
With such foundation, you will find that LLMs work really well with only default set of simple agents like "plan", "explore" and "implement".

Stop patching your product with 3rd-party agents and skills, and start investing into your codebase and documentation quality!
Stop overinvesting into agents and skills, they are _painkillers_, not cure.
Leave AGENTS.md only to very AI-specific things and put explanation how your documentation is structured and how to use it.
Start optimizing your codebase for efficient human contribution and understanding, and you'll see that LLMs will "feel" better and deliver more.

In other words,

> Speed-focused engineers that deliver a feature in just one day by generating 10k LOC per day... they will bury your product in the long run.
>
> 1k LOC in one week that delivers 5 features - is the state we should aim for.
> Investing in quality was never that cheap and effective as it is now, with LLMs.

This will pay off in many ways:

- __No "LLM dependency"__ - If LLMs become too expensive, your codebase is optimized for human contribution and understanding, so you can keep decent delivery speed even without LLM. Use LLM to avoid vendor lock-in with LLMs! Isn't it a smart move in such unpredictable time?
- __Less burnouts__ - engineers will be happy to work on a such codebase. Ask any engineer about their favorite codebase, and you'll find that it's not the one with the most features, but the one with the best documentation and code quality.
- __Better talent attraction and retention__ - if you tell the best engineers on the market, that in your company they will have space for deep-thinking, more scientific and meticulous approach to software development, and minimal context switching, what do they do?
- __Naturally less bugs__ - and, therefore, happy customers!

:happy[Optimize for humans and high quality], and even LLMs will "feel" better and deliver more.
