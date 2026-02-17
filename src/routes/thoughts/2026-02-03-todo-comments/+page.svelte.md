---
layout: Thought
description: I often see linters have rules to forbid TODO comments. Is it really good advice?
---

# TODO Comments Are Not Bad

My main language is [Elixir](https://elixir-lang.org/).
The most popular linter for Elixir is [Credo](https://github.com/rrrene/credo).
At the moment of writing, it has a rule to forbid TODO comments and it's enabled by default.
The explanation is the following:

> The premise here is that TODO should be dealt with in the near future and are therefore reported by Credo.
>
> Like all Software Design issues, this is just advice and might not be applicable to your project/situation.

## Many sources of annoyance

From first sight, it seems like good advice: _handle TODO before merge, don't let them accumulate._

But do we really follow it as designed?
Usually one of the following happens when you have no capacity to resolve TODO before finalizing the code:

**TODO comment removed** ->
Deleting or not writing the comment is bad because we lose some knowledge:
an explanation of a problem and a hint on how to make it better for :happy[the next person who touches the code].
I expect such behavior to prevail when an engineer is under stress.

**TODO comment removed, follow-up issue created** ->
This looks good from the first sight, but has a significant flaw: the issue is detached from code.
It reduces the chance of handling TODO during development of another issue.
And the chance that AI agent will handle it as part of some other work.

For big complex tech-debt items, issues are definitely good.
I believe that for significant problems you will create a follow-up issue despite the linter rule.
I only doubt the idea that issue creation should be a replacement for a TODO comment.

**"TODO" part of the comment removed** ->
This is merely annoying and a waste of time.
Also it prevents easy distinction between TODO/FIXME/BUG comments and documentation comments.
Such distinction helps both humans and AI agents to understand what is esatblished pattern, and what is an unresolved tech debt and should not be taken as an example.

More ways to satisfy the linter rule are possible, but those ones are the most common in my experience.

Another annoyance booster is when you get this error from a long-running CI pipeline because linter was too slow on your local machine.

Considering that we often has no capacity to do things without introductin tech debt,
observing all of this led me to the idea that

> Forbidding TODO comments brings more harm than good.

So, I advise to allow TODO comments.
Forbid them only when you _actually see_ that such lint will improve code quality in your team.

## Make them serve you

You can go beyond just allowing TODO comments.
I realized that we miss many opportunities to use TODO comments as a tool.
To name some:

_Introduce a new metric "TODOs per Domain"._
Just grep the amount of TODOs in each domain and track it over time.
In combination with other metrics it can be used to estimate technical debt and make informed decisions about refactoring.
If the amount of TODO comments grows exponentially - it'll mark that domain needs attention.

_More efficient tech debt cleanup._
Instead of (or in addition to) having big tech debt cleanup rounds that involve managing issues, selecting the most important ones, and probably context switching to a domain you are not focused on now, you can just have a "TODO cleanup" micro-rounds more often.
Just cleanup TODOs close to what you're working on right now.
No need to context switch - the related domain is already in your active memory.
Such tradition is cheap from a business process perspective, but has potential to significantly reduce the amount of tech debt in the project and the need for big tech debt cleanup rounds.
TODO comments are essential here because you can easily "grep" for them and focus on the closest ones.
