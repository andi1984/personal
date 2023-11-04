---
date: 2021-01-05T21:45:55
title: Using PropTypes with TypeScript
template: blogpost.twig
description: In this note we clarify how to use PropTypes together with TypeScript
---

You are using React and want to combine it with TypeScript or vice versa? You might come to the point you might ask yourself how to infer TypeScript types based on PropTypes?

I found the answer in [Stefan's blog post](https://fettblog.eu/typescript-react/prop-types):

> Thankfully, the prop-types types package gives you some handy tools. All you need is the InferProps generic [.]
> -- <cite>[TypeScript and React: Prop Types](https://fettblog.eu/typescript-react/prop-types)</cite>

There is an alternative blog post about this on [dev.to](https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88).

I hope this is as helpful for you as it was for me.

Greets,

Andi
