---
layout: Thought
description: Have you considered Mastodon as a comments solution for your blog?
---

# Fediverse Comments for Your Blog

This site does not use [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/).
It's built with [SvelteKit](https://svelte.dev/).
Because I want it to be something more than a simple blog, I see it as a personal _"research, art and social project"_.
I'll write a separate post about it, but later.

One of the first feedbacks I got was:

> where is comments?

So, I implemented them.
But you remember, it's a bit more than a simple blog. =)

This site is a research project.
Among other things, I want to test how long I can survive without cookies.

This site is about :happy[humanistic] approach to software development.
Among other things, I do not want to have a comment section from a 3rd party provider that collects and sells user data.
Even if some provider has a good privacy policy today, in the modern world you have no guarantees for tomorrow.

That said, 3rd party providers, especially commercial ones, were not an option for me.

Custom implementation most probably will require cookies, so it was not an option for me as well.
(And it's way above the "simplicity bar" I set for this project.)

## Fediverse...

That was my immediate thought when I was looking for a solution.
5 minute googling led me to [a solution for Hugo](https://stuartschechter.org/posts/fedi-comments/).
The idea is simple:

- You create an announcement of the post on Mastodon.
- Simple JS uses [public Mastodon API](https://docs.joinmastodon.org/methods/statuses/#context) to fetch comments and display them on the page.

This is in good alignment with the values of this project:

- Mastodon is "anti-corporate" and also decentralized, so it fits my privacy requirements.
- Mastodon community leans towards :happy[humanistic values], so I expect it to be a good place for discussion of my posts.
- I think projects like Mastodon and other Fediverse projects are what modern digital world desperately needs, so :happy[I want to support and advertise them. This technology truly deserves it!]
- I finally have a meaningful reason to create a Mastodon account and start actively using it!

Highly recommend this approach!

There is more than one article with solutions, search for one that fits your tech stack.

## Devil in the details

Well... there are some pitfalls.

First one - public API will return only first 60 comments per post.
I rarely see more than 60 comments on a blog post in the Internet, but if this site becomes very popular, or some post sparks a very intense discussion - it will be a problem.

But I use SvelteKit, not Hugo.
I have a server.
I can make requests from the server using my personal token, and it will be pretty simple refactoring.
But if you use static site generator - well... that's why I avoided static site generators for this project. =)

Second one - rendering.
You can start with something super simple, but proper solution needs:

- handle nesting (replies to replies)
- comment content is HTML, you need to sanitize it before rendering (I use [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize))

Even considering this, complexity of proper solution is low.
Still recommend it!

And you can see the result below with my own testing comments.
Don't hesitate to add yours!
