---
date: 2020-09-27T15:22:00+01:00
title: flex-basis refers to width/height?
template: blogpost.twig
devto: https://dev.to/andi1984/flex-basis-refers-to-width-height-37jo
---

This week I realized again something about flexbox and flex-basis in particular which I tend to forget while working on
other CSS styles.

It is about the [flex-basis](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) property:

> An absolute `<length>`, a `<percentage>` of the parent flex container's main size property, or the keyword `auto`.

What is referred here as "main size" is the size along the main axis of the flexbox.

Thus, this means flex-basis refers to:

- `width` in case of `flex-direction: row`
- `height` in case of `flex-direction: column`

My misconception here was that `flex-basis` ALWAYS refers to the `width`.
