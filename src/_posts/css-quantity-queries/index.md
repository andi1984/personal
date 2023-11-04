---
date: 2017-09-27T13:20:15+01:00
update: 2020-11-03T09:08:16
title: CSS Quantity Queries
template: blogpost.twig
devto: https://dev.to/andi1984/css-quantity-queries-1148
---

Hi,

today I want to talk about a handy CSS snippet for day to day usage. The _CSS
Quantity Queries_! There is also [short video](https://www.youtube.com/watch?v=PXmvVxx_I60) about it, in case you just want to
understand the basic idea behind it. The following post goes more into detail on
how to use them.

## How to use?

I don't want to give you the full background or insight into those. Especially
as [Heidon Pickering](http://twitter.com/@heydonworks) has done this already in
a great [A List Apart article](http://alistapart.com/article/quantity-queries-for-css).

Let's say you have an unordered list

```html
<ul>
  <li>1st</li>
  <li>2nd</li>
  <li>3rd</li>
</ul>
```

you want or need to style somehow different depending on the _quantity_ of list items in it. Here come the _quantity queries_ into the game.

```css
li:nth-last-child(3):first-child,
li:nth-last-child(3):first-child ~ li {
  color: green;
}
```

## Explanation

I admit that those queries are not the prettiest looking things on earth, but they work as expected. The first selector gives us the li which is the 3rd one by start counting from the last `li` child of the list and the first child likewise — aka. the first li of a list with three elements — tada! This is apparently the _magic_ behind.

The second selector is only to select all upcoming `li` after the first one, to adapt the CSS rules in the end for all elements in the list.

So the above code snippet will style all list items of a list with three entries in green color.

## Advanced Usage - Quantity Thresholds

Obviously you may asking for a more realistic use case than styling for a discrete quantity, but styling differently _starting_ with a given threshold like "three or more entries".

Here we can use the `n` argument:

```css
li:nth-last-child(n + 3),
li:nth-last-child(n + 3) ~ li {
  color: green;
}
```

where `li:nth-last-child(n+3)` "[...] omits the last [two] items from a set of any length, meaning that when you reduce the length of the set below [three], you cease to see any selected items. It’s a sort of “sliding doors” effect. [...] If, indeed, the set is greater than or equal to [three] in total, then all that remains is to style those last [two] items as well." ([A List Apart article "Quantity Queries for CSS"](https://alistapart.com/article/quantity-queries-for-css)).

Here you can play around with a live CodePen demo. Have fun!

<iframe height='265' scrolling='no' title='CSS Quantity Queries' src='//codepen.io/andi1984/embed/preview/LxoywP/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/andi1984/pen/LxoywP/'>CSS Quantity Queries</a> by Andreas Sander (<a href='http://codepen.io/andi1984'>@andi1984</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

Happy usage!
