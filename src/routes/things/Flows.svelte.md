---
title: flows
icon: icon-[simple-icons--ruby]
year: '2020'
links:
  - icon: icon-[simple-icons--github]
    label: github
    url: https://github.com/ffloyd/flows
---

A library for Ruby that implements flexible DSL for writing service objects.
It is idiomatic, has zero runtime dependencies, and is optimized for minimal performance overhead.

I wrote it to substitute [Trailblazer](https://trailblazer.to/) that had performance issues and hard-to-understand design.
I considered [Dry-transaction](https://dry-rb.org/gems/dry-transaction/) as a solution, but I found that its non-idiomatic design would be a problem,
also it missed some important features.

The library fully replaced Trailblazer in the service my team was working on.
Refactoring was trivial, engineers had no problems switching to the new DSL.
Level of confusion was decreased and requests became up to 30% faster.

I haven't advertised this library to Ruby community and company I made it for no longer exists.
The project is frozen because I'm not using Ruby actively nowadays.
