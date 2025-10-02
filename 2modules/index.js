// index.js - CommonJS (CJS) Consumer Example
// -------------------------------------------
// This file demonstrates how to consume (import) other CommonJS modules.
// CommonJS uses `require()` for importing and `module.exports` or `exports` for exporting.
// By default, Node.js treats .js files as CommonJS unless "type": "module" is set in package.json.

// 1. Importing a CommonJS module using `require()`:
//    `require()` is a function that synchronously loads a module.
//    It returns the `module.exports` object of the required module.
//    You can assign the entire exports object to a variable, or destructure specific properties.
const math = require('./math'); // Imports the entire exports object from math.js

// 2. Destructuring named exports from a CommonJS module:
//    If a CommonJS module exports multiple properties on `module.exports`,
//    you can destructure them directly.
const { add: addFunction } = require('./math'); // Renaming 'add' to 'addFunction' for clarity

console.log('--- CommonJS (CJS) Examples ---');

// Using the imported 'add' function from math.js
const result = math.add(5, 3);
console.log('CommonJS: 5 + 3 =', result); // Expected: CommonJS: 5 + 3 = 8

// Using the destructured 'addFunction'
console.log('CommonJS (destructured): 10 + 4 =', addFunction(10, 4)); // Expected: CommonJS (destructured): 10 + 4 = 14

// CommonJS `require()` can be called conditionally or dynamically:
// This is a key difference from ESM `import` which is static.
if (true) {
    const dynamicModule = require('./math'); // Example of dynamic require
    console.log('CommonJS (dynamic require): 2 + 2 =', dynamicModule.add(2, 2)); // Expected: CommonJS (dynamic require): 2 + 2 = 4
}

// To run this example:
// 1. Ensure `math.js` is in the same directory.
// 2. Run from your terminal: `node index.js`
//    (Node.js treats .js files as CJS by default, or if "type": "commonjs" is in package.json)
