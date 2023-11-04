---
title: Starting with TypeScript via JSDoc
date: 2020-11-27T11:08:22
template: blogpost.twig
devto: https://dev.to/andi1984/starting-with-typescript-via-jsdoc-3ji5
---

In this post it is all about a very interesting technique to use the typing definition of TypeScript without doing a full buy-in for TypeScript.

## JSDoc

> JSDoc 3 is an API documentation generator for JavaScript[...]
> -- <cite>[JSDoc](https://jsdoc.app/about-getting-started.html)</cite>

So most probably you are already using JSDoc for documenting your code. If you don't, you should definitely do!

### JSDoc Typedefs

You might also know that JSDoc provides a way to declare [custom types via the @ŧypedef keyword](https://jsdoc.app/tags-typedef.html).

So we could get something like this:

```js
/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * @type NumberLike
 */
const number = 2;
```

But you might not know that you can also import type definitions within the curly braces of the `@typedef` rule, did you? I also didn't...

## TypeScript

That is where [TypeScript](https://www.typescriptlang.org) comes into play:

Example:

File: `typings.ts`

```ts
export type Car = {
  manufacturer: string;
  series: string;
};
```

With this we simply importing those TS-based type definitions as a JSDoc type definition:

File: `foo.js`

```js
/**
 * @typedef {import("./typings").Car} Car
 */

/**
 * @type {Car}
 */
const porsche911Carrera4S = { manufacturer: 'Porsche', series: 'Porsche 993' };
```

I have also created a small [Github Gist](https://gist.github.com/andi1984/e9e73015ad672f036b4562fecc1e0747) where you can see all code at a glance.

## Benefits

Let us be honest... The shown solution here is a trade-off between having no typed language at all or having a 100% TypeScript codebase. Thus this approach will never be as sophisticated as a 100% TS approach, but definitely better in terms of linting, autocompletion and type hints in VSCode as you would have with a plain JS file.

In case you have a huge, complex project with a team behind and you want to dig into type definitions to get some better feeling, understanding and experience with TypeScript, this approach might help you to start getting your fingers dirty.

## Book Recommendation

As you seem to be interested in TypeScript I would like to recommend you a newly released book written by [Stefan Baumgartner](https://fettblog.eu) called ["TypeScript in 50 lessons"](https://www.smashingmagazine.com/printed-books/typescript-in-50-lessons/). But also his blog [https://fettblog.eu](https://fettblog.eu) is an amazing source of TypeScript lessons. Check it out!

Cheers,

Andi
