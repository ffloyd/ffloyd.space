---
layout: Vision
description: A simple thinking framework to make creativity constructive when you design your next thing.
---

# Demand, Deadlines, Requirements

High-quality software design requires creativity.
In my experience, :stoic[pragmatic creativity] usually looks like repeated switching between two modes: _diverge and converge_.

In the _diverge_ mode, you generate as many ideas as possible.
You brainstorm, search for related solutions, explore different opinions, and so on.
:happy[You dream up the solutions you want to bring to life.]

In the _converge_ mode, you :stoic[slow down and analyze] the generated ideas.
Pick the best ones, combine them, and make a decision on how to proceed.

Then you may switch back to _diverge_ mode to continue with the next aspects of the design.

While _diverging_, you push your creativity to the limits and allow your intuition and imagination to guide you.

While _converging_, :stoic[efficient formal reasoning] about the applicability of generated ideas is essential.

Here I propose a simple mental framework to make the _converge_ stage :happy[less stressful] and :stoic[more structured].
Validate each idea from the perspective of three questions:

- Who and what form the **demand**? (__Who__ needs it, __why__ and __how often__?)
- What are the **deadlines**?
- What are the **requirements**?

## Demand

This unfolds into three questions:

**1. Who are those people who will use it?**
Depending on who they are, some ideas may be more suitable than others.
An interface that is convenient for an engineer is often extremely confusing for a non-technical user.
And vice versa: an interface that is intuitive for a non-technical user may be too restrictive and not flexible enough for an engineer.

**2. What pain are you solving?**
It's important because there is usually either pain or curiosity behind the demand.
More often than not, it's pain.
When you know the pain you solve, you can reject ideas that do not address this pain.
Also be aware that using a new feature is always a discomfort for users, because they need to learn how to use it.
Reject solutions that __are more painful to use__ than the pain you're trying to solve.
(E.g., if your automation is more _painful_ to use than the manual process, it's not a good solution.)

**3. How often is the feature you're designing going to be used?**
If you're building a "Delete account" button and interface, a less polished but easier-to-implement solution is probably good enough, because this feature is used only once per user.
But if you're building a "Send" button and its behavior in a chat app, some _healthy_ degree of perfectionism is definitely worth it.

All three questions are interconnected.
What is painful for a user depends on who the user is and how often they need to use the feature.

## Deadlines

Obviously, solutions that cannot be delivered within the required time frame should be rejected.

If you do not know your deadlines, your ability to choose the best approach can be severely impaired.

If you cannot get concrete deadlines, make your best estimates and include them in the final proposal for transparency and feedback.

This section may seem obvious, but I often see decisions made without a clear understanding of deadlines, or at least without explicitly communicated assumptions about them.

## Requirements

**What are the requirements?**
You need a concrete requirements list (e. g. _definition of done_).
Something that will explicitly mark the solution as complete.

Usually, it's possible to have a list of formal, measurable requirements.
When you have it, you can easily reason about the completeness of an idea and reject solutions that do not match the known set of requirements.

Important thing to highlight, that requirements can be split into two subsets:

- **External** - focused on user needs and problems.
- **Internal** - focused on technical aspects, such as maintainability, scalability, etc.

Make sure you paid attention to both.

## Embrace some uncertainty

It happens that it's not possible to get proper answers to the questions above.
Then work with what you have, but communicate that it may lead to less impressive results or even to a solution that _reduces_ the value of the whole product.
