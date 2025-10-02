// math.js - CommonJS (CJS) Module Example
// ---------------------------------------
// This file demonstrates how to define and export functionality using CommonJS syntax.
// In Node.js, .js files are treated as CommonJS modules by default (or if "type": "commonjs" is in package.json).

// CommonJS modules export their public API through the `module.exports` object.
// Anything assigned to `module.exports` becomes available when another module `require()`s this file.

// Define a function to add two numbers.
// This function is local to this module until it's explicitly exported.
function add(a, b) {
  return a + b;
}

// Exporting the 'add' function:
// Method 1: Assigning an object to `module.exports`.
// This is the most common way to export multiple items or a single main item.
module.exports = {
  add: add, // Exporting the 'add' function under the name 'add'
  // You can also use shorthand property names if the key and value variable name are the same:
  // add,

  // You can export other functions or variables as well:
  subtract: (a, b) => a - b,
  version: '1.0.0'
};

// Method 2: Using `exports.name = ...` (shorthand for `module.exports.name = ...`)
// This is useful for adding individual properties to the `module.exports` object.
// Note: If you reassign `module.exports` (like in Method 1 above), `exports` will no longer refer to it.
// So, generally stick to one method per module to avoid confusion.
// exports.multiply = (a, b) => a * b;

// How to import this in a CommonJS file (e.g., index.js):
// const math = require('./math'); // Imports the object { add, subtract, version }
// console.log(math.add(5, 3));
// const { add, subtract } = require('./math'); // Destructuring specific exports
// console.log(add(10, 2));