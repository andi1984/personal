---
title: My Neovim journey
date: 2021-10-10T11:18:52
template: blogpost.twig
devto: https://dev.to/andi1984/my-neovim-journey-3on6
---

Do you know [Vim](https://www.vim.org/)? This lightweight, but
weird-feeling, editor you might (need) to use on a server shell
for looking through files etc.?

I never got comfortable with it, but I also did not spend time
looking into it...

## Neovim to Vim is like Yarn to NPM?

Now there is [Neovim](https://neovim.io/). Neovim is a _fork_,
an implementation of Vim. And it is actually quite
[popular](https://twitter.com/github_tracker/status/1446845600826372100).

> Neovim is an implementation of Vim, but focused on
> extensibility and usability. The key feature is asynchronous
> plugins (mostly) compatible with Vim, which significantly
> improves performance for things like code-completion and
> linting.
> -- <cite>[console.dev](https://console.dev/articles/neovim-best-code-editor-ide-for-developers/)</cite>

## How did I get there?

How did I, as a [VSCode](https://code.visualstudio.com/) power user and
[extension](https://marketplace.visualstudio.com/items?itemName=andi1984.tinypng)
creator, ended up in using Neovim?

Well, VSCode is based on [Electron](https://www.electronjs.org/) and in the end
with dozens of extensions enabled, you basically use a Chromium browser with
extensions under the hood that keep any fans - except the M1 ones -
busy. Due to RAM memory limitations on my machine, I ended up in constant
memory (swap) management recently.

Thus, my primary motivation to try out Neovim was: reducing load on my
machine.

## Mouse is lava

One of the key concepts of (neo)Vim is to not _waste_ any time moving your
fingers away from keyboard (e.g. for using your mouse to interact with the
editor's UI).

It is all about your [muscle
memory](https://en.wikipedia.org/wiki/Muscle_memory) to optimize your workflow
by using default keyboard navigation, custom shortcuts, but also plugins you
can install as you can do in VSCode. 

Thus after many, many years of training, your Neovim muscle memory is huge enough to 
fight against [The Primeagen](https://www.youtube.com/watch?v=H3o4l4GVLW0) who
is typing and navigating faster within Vim than coconut oil is dripping - pun intended.

## Where to start

You may say:

> "I am overwhelmed! Help me!"

Calm down - I have been there before. Due to the steep learning curve, you need
to have some kind of motivation to start looking into the Vim ecosystem - in
my case it was due to hardware limitation reasons.

Without any kind of motivation, you will open and close it frustratingly after
half a minute of question marks popping up inside your brain. I did this for
many years, piling up a little more frustration on every occasion when I failed
doing basic work and navigation within Vim (e.g. while ssh'ing on a server).

### Online Resources

As Vim was introduced in [_1991_](https://de.wikipedia.org/wiki/Vim) which is
maybe even before your own "release" date, you can imagine that there are A LOT
of resources out there on the web.

Here are just a few that I collected over time (tbc.):

- [Beginner guide](https://thevaluale.dev/vim-beginner/)
- [Online-version of the help page](https://vimhelp.org/)
- [Cheatsheet](https://devhints.io/vim)
- [Tips Wiki](https://vim.fandom.com/wiki/Vim_Tips_Wiki)
- [Plugin Database](https://vimawesome.com/)
- [(Unpublished) Book "Learning to play Vim"](https://themouseless.dev/vim/)
- ["Neovim and Tmux for JavaScript development](https://elijahmanor.com/blog/neovim-tmux)

### The community

The [Vim](https://www.vim.org/community.php) and
[Neovim](https://neovim.io/community/) community is quite new to me, but there
are definitely some "vimstigator" or at least quite famous people on the social
interwebs.

#### ThePrimeagen

The first one I came across is ThePrimeagen. I randomly landed on one of his
[streams](https://www.twitch.tv/theprimeagen).

IMHO Prime - I even don't know his real name - is a proud dad, [cow
owner](https://twitter.com/ThePrimeagen/status/1446177392536477703), [nature
guy](https://twitter.com/ThePrimeagen/status/1445163951201955847). 

No, seriously. He works at Netflix and thus he is a pretty smart guy. But at
the same time he is a born entertainer which results in a stream with hundreds
watching him working on a C++ implementation of a network layer for Netflix. _I
am not kidding!_

And his Vim skills are crazy as he is - but in a good way. If you have prepared
yourself with enough coconut oil, you are safe to watch his streams. :)

### TJ DeVries

If you know ThePrimeagen, you most probably also know TJ.
[TJ](https://github.com/tjdevries) is actually a
_core maintainer of Neovim_! So he is building the thing I try you to tell
about. But he can do probably hundred times better than me and knows all the
insights.

### [VimConf](https://www.vimconf.live/)

At the 29th to the 30th of October 2021 there will be a second version of
VimConf happening online. I think this event will be a good opportunity to get
in contact with the community and learn new, awesome stuff.

### Dotfiles, Plugins, Configurations...

Take your time!

Altogether it is important that you _start your vim journey on your own_ with
the help of others. But it is all about _your workflows_, _your needs_ and
_your muscle memory_!

Over time you will find out which settings you want to (un)set, which plugins
might be helpful for your work and which configurations you might want to copy
paste from someone else or you want to write on your own.

All this needs some decent amount of time you will need to invest, but you
should not care about that at the very beginning.

I just started this journey mid 2021 and thus I see myself at the very
beginning of this process after a few months now. 

In case you really want to dig into some dotfiles and vim configurations, watch
[ThePrimeagen's YT videos](https://www.youtube.com/watch?v=DogKdiRx7ls) and dig
into other people's dotfiles.

Shameless plug: I have [my dotfiles
public](https://github.com/andi1984/dotfiles/tree/master/vim/lua), but be aware
those are _my_ dotfiles, they fit my needs and I consider themself "Work in
progress". So I am not sure how much value they might bring to you.

_And now I wish you an awesome start with your very own Vim journey!_

Sincerely yours,

Andi
