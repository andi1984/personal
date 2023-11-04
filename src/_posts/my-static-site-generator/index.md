---
title: Back2Roots - My static site generator
date: 2020-02-04T22:50:00+01:00
template: blogpost.twig
---

To bootstrap this blog, I wanted to do something new. Far away from the new hotness of static site generators like [Gatsby](https://www.gatsbyjs.org/) or [Next.js](https://nextjs.org/).

## Motivation

I wanted to do something _simple_, but at the same time, _I wanted to learn new things about Node and TypeScript_!

So I came up with [Back2Roots](https://github.com/andi1984/back2roots) which is a Node-based static site generator using Markdown and Twig as a templating language. Of course, the feature list is far more reduced than it would be for any existing generator, but while working on Back2Roots I learn about Node and TypeScript.

So, in the end, I'm building my new blog with a new, custom tool that I've to build on my own while learning new things. So what can I expect more?

Back2Roots is an open-source project. Feel free to fork and adapt it to your needs or let me know about feature requests or bug reports!

## TypeScript + Node + Markdown + Twig

The project is based on Node with [TypeScript](https://www.typescriptlang.org/) from the ground up. The actual static site generation happens via

1. parsing the markdown files via [markdown-it](https://github.com/markdown-it/markdown-it)
2. setup Twig infrastructure via [twig.js](https://github.com/twigjs/twig.js)
3. passing the markdown data through the Twig instance which generates the final HTML files

## It's open-source!

The project is published on [Github](https://github.com/andi1984/back2roots) under [MIT License](https://github.com/andi1984/back2roots/blob/develop/LICENSE).
