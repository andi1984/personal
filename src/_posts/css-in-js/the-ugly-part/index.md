---
date: 2023-12-26T13:20:15+01:00
title: The ugly part of CSS-in-JS
devto: https://dev.to/andi1984/the-ugly-part-of-css-in-js-2iph
---

One often-overlooked aspect of CSS-in-JS is its "dark side"—the "JS" part. What does this mean? Essentially, when you're writing your styles **within** JavaScript, you expose yourself to the quirks and intricacies of JS itself.

## The Issue Illustrated

Consider the [following example](https://codesandbox.io/embed/css-in-js-ugly-part-vcmtx5)

```js
import React from "react";
import { render } from "react-dom";

import styled from "styled-components";

const IBreakStyles = styled.p`
  padding: ${({ $count }) => $count + "px"}};
  color: red;
  background-color: blue;
`;

// Render these styled components like normal react components.
// They will pass on all props and work
// like normal react components – except they're styled!
const App = () => (
  <IBreakStyles $count={20}>
    I should have a color and background!?!?
  </IBreakStyles>
);

render(<App />, document.getElementById("root"));
```

You might notice that the styles defined in `IBreakStyles` aren't applied as expected. Digging into the element with your development tools reveals a complete absence of styles.

## The Root Cause

The culprit is a stray closing curly bracket within the template literal:

```js
const IBreakStyles = styled.p`
  padding: ${({ $count }) => $count + "px"}}; /* <-- The offender */
  color: red;
  background-color: blue;
`;
```

What happens is that the CSS-in-JS library (in this case, styled-components) interprets the template literal in a specific way. This leads to parsing the CSS via JavaScript, and the stray curly bracket disrupts the intended behavior—likely closing some parent block in the JS logic.

## The Silent Problem

The real issue is the absence of any alert mechanism: no errors are thrown, and no red squiggly lines appear in your editor to warn you. If you're fortunate, your editor's CSS-in-JS tooling might catch this, but that's not a guarantee.

## A Thought to Ponder

Given these complexities, it's worth questioning if a separation of concerns—CSS in CSS files and JS in JS files—might not be a more foolproof approach, much like the "good old times."

Best regards,  
Andi
