---
date: 2020-10-19T15:22:00+01:00
title: Vivaldi - How to make links focusable?
template: blogpost.twig
---

This is for everyone who is using the [Vivaldi](https://vivaldi.com) browser. In case you wondered why links are not focusable when you're tabbing through a website, I can let you know: You're not alone!

## Solution

The solution is stated in a [Vivaldi forum post](https://forum.vivaldi.net/topic/50049/links-with-href-attributes-not-keyboard-focusable):

> This has to be enable in Vivaldi Settings > Webpages > Webpages Focus > (\*) Focus All Controls and Links.

So for unclear reasons the Vivaldi team decided to exclude links as focus-able areas per default and each user has to change this setting on its own.

That's why I opened a [feature request](https://forum.vivaldi.net/topic/51633/links-with-href-attribute-are-focusable-per-default) and a bug report (ticket: VB-73381) to change the setting's default value.

But for now you know how to fix this A11Y issue on your own in your Vivaldi browser settings.

Happy browsing!
