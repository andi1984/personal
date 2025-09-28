---
date: 2021-11-17T09:00:00+01:00
title: "React – How to find out WHY a component gets rerendered? (Transcript)"
description: "Step-by-step transcript of profiling React components with the DevTools to understand unnecessary rerenders."
youtube:
  videoId: mqNEScr9NiI
  url: https://www.youtube.com/watch?v=mqNEScr9NiI
  views: 5551
  published: 2021-11-17
  viewsText: "5,551"
heroImage: https://i.ytimg.com/vi/mqNEScr9NiI/hqdefault.jpg
---

![React DevTools profiler showing commit flame graph](https://i.ytimg.com/vi/mqNEScr9NiI/hqdefault.jpg)

> Published on 17 Nov 2021 • 5 551 views (snapshot when curated).

[Watch the original video on YouTube.](https://www.youtube.com/watch?v=mqNEScr9NiI)

## Transcript

00:00 — Hey folks, Andi here. Today I want to show you how I figure out why a React component rerenders more often than it should.

00:12 — I have a small demo app running locally. When I click this toggle you can see the header flashes. That is the rerender I want to understand.

00:26 — Step one is opening the browser DevTools. I am using the React DevTools extension, so once it is open I switch to the **Profiler** tab.

00:40 — Inside the Profiler I hit the record button, interact with the page, and then stop recording. This gives me a flame graph of the last commit.

00:58 — You can already spot that `Header` and `NavLink` rendered even though I only changed the checkbox. That is my first clue.

01:12 — I click on `Header` in the profiler timeline. On the right the tool tells me what triggered the render. It shows `Context.Provider` passing a new object reference.

01:32 — That means the rerender is probably caused by creating a fresh context value on every state update. Classic mistake.

01:45 — To confirm I open the component source. Here we have `const value = { theme, toggleTheme }` inline in the component body.

02:02 — Because that object literal is recreated on each render, React thinks the context changed, so every consumer rerenders. Easy fix: memoize the value.

02:18 — I wrap the context value in `useMemo(() => ({ theme, toggleTheme }), [theme])`. Now the reference stays stable as long as the theme is the same.

02:38 — Back in the app I repeat the profiling session. Record, click, stop. The new flame graph shows only the toggle component rerendering.

02:55 — The detail pane now says “rendered by state change in ThemeToggle,” which is exactly what we expect. Mission accomplished.

03:08 — A quick recap: record an interaction, inspect the commit, read the “rendered by” hint, and look for changing props or context values.

03:25 — You can apply the same workflow to prop drilling or Redux selectors. The profiler will tell you which prop changed and which component is responsible.

03:42 — React DevTools has more goodies like ranked charts, but the timeline with reasons is usually all you need to hunt down noisy renders.

04:00 — Thanks for watching. If you enjoyed the debugging walkthrough hit like, subscribe, or drop a comment about other React tooling topics you would like to see.
