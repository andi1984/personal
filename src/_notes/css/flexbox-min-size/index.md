---
date: 2020-12-12T12:18:31
title: Automatic Minimum Size of Flex Items
template: blogpost.twig
devto: https://dev.to/andi1984/automatic-minimum-size-of-flex-items-20af
---

Today I would like to talk about flexbox and the automatic minimum size of flex items, means how the flexbox algorithm is internally calculating the minium size of flex child elements aka. flex items.

## Example

Let us start looking at some example code:

```html
<section>
  <div>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</section>
```

```css
section {
  display: flex;
  flex-direction: column;
}

div {
  flex: 0 1 50px;
}
```

What do you think? How much will the height be of the `div` flex child? **It will be the minimum size the content will need to be rendered.**

## Example (Overflow container)

Let us adjust the example by making the flex-child element a scroll container on its own:

```css
div {
  flex: 0 1 50px;
  overflow-y: scroll;
}
```

What will the height be now? **It will be the flex-basis of 50px.**

## Explanation

Why is that you my ask and I asked that myself several times. Having a look into the official specs can be helpful here:

> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a scroll container is a content-based minimum size; for scroll containers the automatic minimum size is zero, as usual.
> -- <cite>[W3C spec](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)</cite>

Thus this means:

1. For non-scroll containers, flexbox automatically increases the main axis minimum size to fit the content's needs
2. For scroll containers, flexbox sets the minimum size to zero

## Summary

Flexbox is a great standard for flexible layouts. But especially on column based layouts I always have to remember myself about the situation shown above, that I need to specify a `min-height` to make sure that the element is not increasing its height to fit the content. It always sounds counter intuitive to me, thus it is always good to read again through the specification in such kind of situations.

I hope this was also helpful to you.

Greets,

Andi
