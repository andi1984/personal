---
date: 2021-03-02T09:00:00+01:00
title: "TypeScript – Type Predicates (Transcript)"
description: "Transcript explaining how custom type guards unlock smarter narrowing in TypeScript."
youtube:
  videoId: Ll1CRprkPDc
  url: https://www.youtube.com/watch?v=Ll1CRprkPDc
  views: 1666
  published: 2021-03-02
  viewsText: "1,666"
heroImage: https://i.ytimg.com/vi/Ll1CRprkPDc/hqdefault.jpg
---

![Screenshot of a TypeScript project illustrating custom predicates](https://i.ytimg.com/vi/Ll1CRprkPDc/hqdefault.jpg)

> Published on 2 Mar 2021 • 1 666 views (snapshot when curated).

[Watch the original video on YouTube.](https://www.youtube.com/watch?v=Ll1CRprkPDc)

## Transcript

00:00 — Servus friends, Andi here. Today we are going to demystify TypeScript’s type predicates and build a couple of custom guards together.

00:18 — Quick refresher: a type predicate is the `foo is Bar` syntax you return from a function to tell the compiler “trust me, the argument is of type Bar when this is true.”

00:36 — I start with a `Person | null` union. Inside an `if (person)` block the compiler still thinks `person` might be null. That’s where predicates shine.

00:55 — Let’s create a helper `function isPerson(value: unknown): value is Person`. Inside the function we check the shape: `typeof value === "object"`, the value exists, and the `name` property is a string.

01:18 — Returning that boolean means everywhere we call `isPerson(suspect)` TypeScript now narrows the type to `Person` on the true branch.

01:38 — I demonstrate in VS Code: before the guard we have `Person | null`, after `if (isPerson(person))` the hover shows a clean `Person` type.

01:58 — Predicates also work with arrays. I write `function isPersonArray(value: unknown): value is Person[]` and reuse `Array.isArray` plus `every(isPerson)`.

02:20 — That means you can validate JSON payloads from APIs and get fully typed results without casting.

02:36 — Another pattern is discriminated unions. I have `type Result = Success | Failure`. A predicate `isSuccess(result): result is Success` checks the `status` field.

02:58 — Inside the success branch I can access `result.data`. Inside the failure branch I handle `result.error`. No `as` casting required.

03:18 — Important reminder: predicates only convince the compiler; they do not protect you at runtime unless the checks are correct. Always validate everything that comes from the outside world.

03:38 — In frameworks like React you can pair predicates with hooks. For example, `const user = useUser()` may return `User | undefined`. Guard once and you get strict typing everywhere downstream.

03:58 — Bonus tip: combine predicates with `asserts` to throw early. A helper like `assertIsPerson(value)` can throw an error while simultaneously narrowing the type for the remaining code path.

04:18 — That’s it! You now know how to roll your own type guards and make TypeScript work for you instead of the other way round.

04:30 — Danke fürs Zuschauen! Drop a comment if you want me to cover more advanced narrowing tricks or conditional types in a future video.
