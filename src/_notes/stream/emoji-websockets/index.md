---
date: 2021-02-02T22:24:19
title: Twitch Stream - Emojis 👋 and Websockets
template: blogpost.twig
---

Hi,

last weekend I did a chill webdevelopment stream on [Twitch](https://twitch.tv/andi1984) with the main topic being the [**Websockets API**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

[You can watch the recording of the stream on Youtube.](https://youtu.be/D3VAPvmdyNs?t=1260)

The result can be found at: [https://emojisocket.herokuapp.com/](https://emojisocket.herokuapp.com/)

By clicking on the emojis in the form fieldset you send an event to an underlying websocket server that itself will broadcast the emoji to all connected clients, thus

tl;dr: If you are on the site at the same time with multiple people (or in multiple tabs, windows) you can send each other emojis. :)

<hr/>

<small>Unfortunately the workflow of Heroku warming up and killing applications quite fast (at least in my free plan), the client connection time is only about a few minutes and afterwards you get unconnected from the server again, thus clicking afterwards on the emojis will not effect anything.</small>
