---
date: 2020-05-23T18:45:45+01:00
title: React - Synthetic blur event
template: blogpost.twig
devto: https://dev.to/andi1984/react-synthetic-blur-event-3469
---

First, let's have a look at what the _blur_ event actually is.

## Definition

> The blur event fires when an element has lost focus. The main difference between this event and focusout is that focusout bubbles while blur does not.
>
> -- <cite>[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)</cite>

## Native browser behaviour

It is clearly saying that the _blur_ event does not bubble up the DOM tree to all parent elements. I proved this by [a CodePen demo](https://codepen.io/andi1984/pen/dyGPoON).

## Behaviour within React

But today I found out together with my colleagues that within [React](https://reactjs.org/) the synthetic blur event **is** bubbling to the container component in the sense that `onBlur` on a parent component is getting triggered by it as you can see within [a CodeSandbox demo here](https://codesandbox.io/s/react-blur-synthetic-event-bubbling-7bb3p).

> React will bubble these events through its event model. So we can listen for focus and blur events at the root of a component and react to these events fired on its child nodes.
>
> -- <cite>[J. Renée Beach](https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b)</cite>

So on the one hand this makes kind of sense within the [React](https://reactjs.org/) ecosystem, on the other hand not knowing that and following the native specs – which we all should follow – it can be quite confusing.

## Summary

In the end, React is breaking out of the standard, the specification – and it's not the [only issue with synthetic events](https://github.com/facebook/react/pull/17330#issuecomment-559978625). They are probably doing so for us, developers. It helps to mentally stay within their ecosystem, their logical rules which are also having advantages, but it is a risky discrepancy between [React](https://reactjs.org/) and [the W3C standards](https://www.w3.org/standards/).
