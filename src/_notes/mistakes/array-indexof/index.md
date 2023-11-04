---
date: 2016-11-20T18:45:45+01:00
title: Mistakes I made - Array.prototype.indexOf
template: blogpost.twig
---

Today I want to talk about a misconception about Array.prototype.indexOf I came across a few days ago.

## What is it doing?

> The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
> ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf))

So this is pretty simple to understand, right? ... Nope! Not for me as my mistake will show you.

## Playing around with it

So here are some examples:

``` js
[1, 2, 3].indexOf(1);
>> 0

['Cats', 'and', 'Dogs'].indexOf('Dogs');
>> 2
```

but

``` js
['a', 'b', 'c'].indexOf('y');
>> -1
```

Pretty straight forward, right?

What's about:

``` js
[[1]].indexOf([1]);
>> -1
```

## The misconception

WTF? There is clear evidence that the array ``[1]`` is a child of the array ``[[1]]``,
so it should be _found_ in it, right? Nope! And here comes my misconception:

The phrase _"[...] element can be found [...]"_ translates directly to the [_strict equality
comparison_](https://www.ecma-international.org/ecma-262/7.0/index.html#sec-strict-equality-comparison)
[indexOf is doing behind the scenes](https://www.ecma-international.org/ecma-262/7.0/index.html#sec-array.prototype.indexof).

So let's see what this is reporting to us:

``` js
[1] === [1]
>> false
```

Okay... Why is this? Let's have a look into the [ECMAScript spec](https://www.ecma-international.org/ecma-262/7.0/index.html#sec-strict-equality-comparison):

> The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows: \
>    1. If Type(x) is different from Type(y), return false. \
>    2. If Type(x) is Number, then [...] \
>    3. Return SameValueNonNumber(x, y). \

So we are in case 3 here. So what is _SameValueNonNumber_ doing?

In our case of two arrays it "Return[s] true if x and y are the same Object value. Otherwise, return false." [ECMAScript](https://www.ecma-international.org/ecma-262/7.0/index.html#sec-samevaluenonnumber).

So when do two arrays have the same _object value_?

## What happens under the hood?

Whenever we create a new array using the array literal like ``let myArray = []`` we create a new _instance_ like
we would do when we would use ``let myArray = new Array()``.

So the strict comparison returns true iff two arrays are basically the same instance! So

``` js
let myArray = [[1], [2]];

myArray[0] === myArray[0];
>> true
```

Boooom! ;)

So this is it! So basically my misconception was to believe indexOf would return true whenever
the container array contains an array which has the same _"value characteristics"_ as my referenced
one. But definitely not! It has to be the same instance!

So be aware of that whenever you use indexOf with non-primitive values! I hope I could help you with that short
insight.

Greets,

Andi
