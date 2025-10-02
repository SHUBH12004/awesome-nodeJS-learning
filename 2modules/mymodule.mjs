// mymodule.mjs - ECMAScript Module (ESM) Example
// ------------------------------------------------
// This file demonstrates both named and default exports using ESM syntax.
// The .mjs extension explicitly tells Node.js to treat this file as an ESM,
// regardless of the "type" field in package.json.

// Named Exports:
// These variables are exported individually by their names.
// When importing, you must use the exact names within curly braces {}.
export const namedExportA = 10;
export const namedExportB = "Hello ESM!";
export const namedExportC = [1, 2, 3];

// Default Export:
// A module can have only one default export.
// When importing, you can give it any name you like without curly braces.
// It's often used for the primary functionality or a single main object/class.
const defaultExportObject = {
    propertyX: "Default X",
    propertyY: 42,
    methodZ: () => "Method Z from default export"
};
export default defaultExportObject;

// You can also define and export directly:
// export default {
//     anotherProperty: true
// };

// How to import these in another ESM file (e.g., app.mjs):
// import { namedExportA, namedExportB } from './mymodule.mjs'; // For named exports
// import myCustomName from './mymodule.mjs'; // For the default export
// import * as myModuleNamespace from './mymodule.mjs'; // To import all as a namespace object
