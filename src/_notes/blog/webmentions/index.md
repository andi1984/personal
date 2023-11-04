---
date: 2021-02-21T21:49:04
title: My blog now supports Webmentions!
template: blogpost.twig
description: Webmention is a standard for communication across the web. All blogposts of mine are finally supporting this standard and webmentions are shown under each blogpost.
---

## What is it?

> Webmention is a web standard for mentions and conversations across the web, a powerful building block that is used for a growing federated network of comments, likes, reposts, and other rich interactions across the decentralized social web.
>
> -- <cite>[indieweb.org](https://indieweb.org/Webmention)</cite>

## How it works?

Webmentions are made of two principles:

- _target_: The resource that is being mentioned
- _source_: The resource (e.g. blogpost, tweet, posting) that is _mentioning_ a _target_

### Bridgy

The first service I use is [Bridgy](https://brid.gy/) that acts as a "bridge" between social media services - that do not support webmentions natively - and this blog.

Bridgy parses those social media platforms for potential mentions of this blog and in case will transform the mention into a real _webmention_ and sends it to the linked webmention service, in my case [Webmention.io](https://webmention.io/).

### Webmention.io

[Webmention.io](https://webmention.io/)'s main task is to _receive_ webmentions and providing an API to get the list of webmentions for a given _target_ (e.g. a specific blogpost).

## Usage

The workflow is _"quite"_ simple:

1. Someone interacts on social media with content that contains a reference to this blog.
2. Bridgy is parsing those social media postings and sends them as webmentions to webmention.io service.
3. Webmention.io receives the webmention and stores it.
4. Whenever someone is reading the blogpost, the blog itself will try to fetch the list of webmentions via webmention.io API endpoint.

In the end you will see at the end of each blogpost a list of webmentions in case there are some. [Here is an example](../../posts/typescript/jsdoc-typedef/index).
