// app.mjs - ECMAScript Module (ESM) Consumer Example
// --------------------------------------------------
// This file demonstrates how to consume (import) other ECMAScript Modules (ESM).
// ESM uses `import` and `export` statements, which are static (parsed before execution).
// The .mjs extension ensures this file is treated as an ESM.

// 1. Importing Named Exports:
//    Use curly braces `{}` to import specific named exports from a module.
//    The names must exactly match the exported names.
import { add } from './math.mjs';
import { namedExportA, namedExportB, namedExportC } from './mymodule.mjs';

// 2. Importing the Default Export:
//    A module can have only one default export. You can give it any name you like
//    when importing (e.g., `myDefaultObject`). No curly braces are used.
import myDefaultObject from './mymodule.mjs';

// 3. Importing all exports as a Namespace Object:
//    This imports all named and default exports into a single object.
//    The default export will be available under the `default` property of the namespace object.
import * as myModuleNamespace from './mymodule.mjs';

console.log('--- ECMAScript Module (ESM) Examples ---');

// Using the imported 'add' function from math.mjs
const result = add(5, 3);
console.log('ESM: 5 + 3 =', result); // Expected: ESM: 5 + 3 = 8

// Using named exports from mymodule.mjs
console.log('ESM Named Export A:', namedExportA); // Expected: ESM Named Export A: 10
console.log('ESM Named Export B:', namedExportB); // Expected: ESM Named Export B: Hello ESM!
console.log('ESM Named Export C:', namedExportC); // Expected: ESM Named Export C: [1, 2, 3]

// Using the default export from mymodule.mjs
console.log('ESM Default Export (propertyX):', myDefaultObject.propertyX); // Expected: ESM Default Export (propertyX): Default X
console.log('ESM Default Export (methodZ):', myDefaultObject.methodZ()); // Expected: ESM Default Export (methodZ): Method Z from default export

// Using exports via the namespace object from mymodule.mjs
console.log('ESM Namespace (namedExportA):', myModuleNamespace.namedExportA); // Expected: ESM Namespace (namedExportA): 10
console.log('ESM Namespace (default export):', myModuleNamespace.default.propertyY); // Expected: ESM Namespace (default export): 42

// To run this example:
// 1. Ensure `math.mjs` and `mymodule.mjs` are in the same directory.
// 2. Run from your terminal: `node app.mjs`
//    (Node.js automatically recognizes .mjs as ESM)