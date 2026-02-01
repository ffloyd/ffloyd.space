---
layout: Vision
description: Design code for the process of understanding. Humans can deal only with ~4 ideas simultaneously. Reduce amount of involved ideas to a minimum.
---

# Always Reduce Cognitive Complexity

**Cognitive complexity** is not about the amount of code in the project.
It is about how many things you need to keep in your head to understand the system.

[Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) is a good attempt to formalize it, but it only scratches the surface.
No automated tool can properly measure cognitive complexity.
That's why _you_ are responsible for controlling it.
Because no one except _you_ can.

Without control, it can become too high.
In the worst case, no one will any longer be able to explain how the system works.
We usually call such projects "bloody legacy".

This article's goal is to explain what I mean by _cognitive complexity_, its influence, and _my_ ways of reducing it.
There's no guarantee that my advice will work for _you_.
But having an example makes finding your own approach simpler.
It's like the skill of riding a bicycle.

In the end it's about writing code and making products that bring more joy into people's lives and reduce suffering.
And too much complexity usually leads to suffering for everyone involved.

## Consider wetware limitations

Our brain can effectively manage only a limited number of concepts at once.
To be precise, it's 4±1 concepts.
But even if it were 7 or 20 the thing is that _there is a limit_.

Obviously, big systems require more than 4 concepts.
And the goal is not to reduce to 4 or less, but to structure them appropriately:

> Structure the system in a way that at any moment you need to keep in your mind only a small number of concepts in order to make high quality decisions.

You may argue: "but I have moments when I feel like I can handle much more than 4 concepts at once!"
This happens when you work with a familiar system that you've already _internalized_.
Roughly speaking, your subconscious is in sync with the external entity you're working with.

Every engineer has written code that's nothing to be proud of.
But in the middle of writing your "spaghetti" code, you probably had moments when you felt that you perfectly understand what you're doing.
This is that _synchronization_ I'm talking about.

_Properly designed systems allow you to reach this state faster and with less effort._
Bad design means that even its creator cannot reach this state (or may never reach it at all).

Next thought can be: "ok, simple systems are easy to understand, it's obvious, what's the point?"
The point is:

## Optimize for the process of understanding

_We write code not for computers, we write code for humans._
For other people who can be very different from you.
Computers do not care about code quality, they just execute it.
Programming languages (like natural languages and also math) are tools for communication _between people_.
It can be harsh, but if your code is not comprehensible for your colleagues, it's bad code.
No matter how clever it is.

**When you load a new system into your subconscious, you do it through the window of those 4 simultaneous concepts.**
This is an unavoidable bottleneck.
If something is clear for you as an author and you see the beauty of your design, it doesn't mean that it's easy to understand for others.
Think of understanding like CPU cache usage: if your working set fits in L1 cache, performance is great.
If you constantly need to get data from RAM or even disk, performance is going to be much worse.
Similarly, if you can keep all important concepts in mind during the learning process, understanding becomes more effective.
Always question yourself:

> What is the effort for a new person to understand this?

It's applicable to almost anything: from a single line of code to the whole codebase.
Ask your colleagues to review your code and documentation from this perspective.
This is _the only way_ to validate that your design is understandable.

Many systems are complex.
And often you have no power to make them simpler.
The more realistic goal is to structure them in a more approachable way.

Last, but not least:

> Consider your audience.

Throwing complex mathematical concepts at an engineer who hasn't used advanced math in years is ignorance, not a demonstration of your skill.
It doesn't mean that you should not use advanced concepts.
You should, it's your advantage as an experienced engineer.
Just make an extra effort to explain them in a way that your audience can understand.
Explaining complex concepts simply is a sign of true mastery.

## Hide unrelated complexity

TBD

## Stabilize domain language

TBD

## Math is about simplifications

TBD
