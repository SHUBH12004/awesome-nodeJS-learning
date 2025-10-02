// math.mjs - ECMAScript Module (ESM) Example
// -----------------------------------------
// This file demonstrates how to define and export functionality using ESM syntax.
// The .mjs extension explicitly tells Node.js to treat this file as an ESM.

// ESM uses the `export` keyword to make functions, variables, classes, etc.,
// available for import by other modules.

// Named Export:
// You can export individual items by placing the `export` keyword before their declaration.
// When importing, these must be imported by their exact names using curly braces {}.
export function add(a, b) {
  return a + b;
}

// Another Named Export:
export const subtract = (a, b) => a - b;

// Default Export (optional):
// A module can have only one default export. It's often used for the primary
// functionality or a single main item from the module.
// When importing, you can give the default export any name you like.
const multiply = (a, b) => a * b;
export default multiply;

// You can also export directly:
// export default (a, b) => a * b;

// How to import these in another ESM file (e.g., app.mjs):
// import { add, subtract } from './math.mjs'; // For named exports
// import myMultiplyFunction from './math.mjs'; // For the default export
// import * as mathFunctions from './math.mjs'; // To import all as a namespace object