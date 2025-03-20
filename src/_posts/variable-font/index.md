---
title: Variable Fonts
date: 2019-03-04T20:08:29+01:00
template: blogpost.twig
devto: https://dev.to/andi1984/variable-fonts-1i9l
---

Today I would like to talk about _variable fonts_ on the web. But what are those?

> Variable fonts are an evolution of the OpenType font specification that enables many different variations of a typeface to be incorporated into a single file, rather than having a separate font file for every width, weight, or style. They let you access all the variations contained in a given font file via CSS and a single @font-face reference.
> -- <cite>[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)</cite>

<!--more-->

## Status quo BEFORE variable fonts

Let us first recap on how we brought in _variation_ into web fonts since the start of custom web fonts:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/B42rUMdcB7c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Okay, yes. So for different variations we had to load a number of different font files, each of them for a specific font type bringing in different variations of the typeface.

So how do the variable fonts solve this problem of requesting a bunch of files over the network?

## Technical background

### Design axes

Variable fonts define _axes of design_, thus dimensions of variations the typeface has like its _weight_.

_Before_ this was done by _redrawing_ each single glyph for each, different characteristic of the variations.

_Now_ – with variable fonts – _each glyph defines a delta_ inside which each of the glyph's control points can vary. Any variation within this delta can be _interpolated_ then and thus instead of saving a lot of variations of the glyphs, what is saved and shipped through the font file is this delta.

And with this we have the full power to create our own, custom variations within the whole delta range instead of just using the fixed variations given by the different font files before.

For a more detailed introduction I would like to highly recommend you [Chris Lilley](https://svgees.us/index.html), technical director at the W3C, and especially his talk on ["WebFonts in 2018: Everything Changes"](https://youtu.be/vNMJtxL5OgE).

<iframe width="560" height="315" src="https://www.youtube.com/embed/vNMJtxL5OgE?start=413" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

At [Axis Praxis](https://www.axis-praxis.org) you can try it out your own changing the font variations. I can recommend for all of you which are not familiar to variable fonts to play around with the range sliders on their side to see how the font and the website changes.

### Control design axes by font-variation-settings

The described design axes are controlled by the _font-variation-settings_ which are described as a list of key/value pairs.

It is build up by four letter axis names followed by their respective value, e.g.

```css
html {
  font-family: 'etc-grandstander', sans-serif;
  font-variation-settings: 'wght' 600, 'slnt' 0;
}
```

### Browser support

Although variable fonts are quite a new thing, the [browser support](https://caniuse.com/#feat=variable-fonts) is ~80% of all global users according to caniuse.com. Internet Explorer is not supporting variable fonts though!

If you are interested in using variable fonts on your page, I can recommend you a good [article from Clearleft](https://medium.com/clear-left-thinking/how-to-use-variable-fonts-in-the-real-world-e6d73065a604) which is also pointing out fallback solutions.

## Variable fonts in the wild!

Back in December I bought [ETC Grandstander](https://v-fonts.com/fonts/etc-grandstander) from the great [ETC](https://etc.supply/) team which are selling also a few other, nice variable fonts.

You can find a list of available variable fonts at [v-fonts.com](https://v-fonts.com/).

Over there at [CSS Tricks](https://css-tricks.com/weird-things-variable-fonts-can-do/) you can read all the _weird things_ you can do with variable fonts. And they have a growing [guide collection](https://css-tricks.com/guides/opentype-variable-fonts/) about that topic. Take a look!

### Developer tools

I can highly recommend the font inspection in the [Firefox Developer tools](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Edit_fonts).

They provide the whole list on information including the design axes with a range slider [you can modify on the fly at the page](https://twitter.com/andi1984/status/1078381928192061441).

Cheers,

Andi
