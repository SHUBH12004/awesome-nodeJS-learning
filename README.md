# 🚀 Node.js & Express.js Learning Journey 🚀

Welcome to this curated collection of Node.js projects! This repository is designed as a comprehensive guide for revision, walking you through fundamental concepts to more advanced topics. Each directory is a self-contained lesson with commented code and detailed explanations.

## 📚 Table of Contents

1.  [**Chapter 1: The Basics & NPM Packages (`1intro`)**](#chapter-1-the-basics--npm-packages-1intro)
2.  [**Chapter 2: Understanding Node.js Modules (`2modules`)**](#chapter-2-understanding-nodejs-modules-2modules)
    - [CommonJS (CJS)](#commonjs-cjs)
    - [ECMAScript Modules (ESM)](#ecmascript-modules-esm)v
    - [Key Differences & Edge Cases](#key-differences--edge-cases)
3.  [**Chapter 3: Building with Express.js (`3express`)**](#chapter-3-building-with-expressjs-3express)
    - [Core Concepts & Routing](#core-concepts--routing)
    - [Serving Static Files](#serving-static-files)
    - [Modular Routers (`express.Router`)](#modular-routers-expressrouter)
4.  [**Chapter 4: Express Middleware (`4middlewares`)**](#chapter-4-express-middleware-4middlewares)
    - [Custom Middleware](#custom-middleware)
    - [Middleware Edge Cases](#middleware-edge-cases)
5.  [**Chapter 5: Interacting with the File System (`5clear-clutter`)**](#chapter-5-interacting-with-the-file-system-5clear-clutter)
6.  [**Chapter 6: Server-Side Rendering with EJS (`6ejs`)**](#chapter-6-server-side-rendering-with-ejs-6ejs)
    - [EJS Tags Explained](#ejs-tags-explained)
    - [Using Partials](#using-partials)
7.  [**Chapter 7: Database Interaction with Mongoose (`7mongoose`)**](#chapter-7-database-interaction-with-mongoose-7mongoose)
    - [Core Mongoose Concepts](#core-mongoose-concepts)

---

## Chapter 1: The Basics & NPM Packages (`1intro`)

This chapter covers the absolute basics: running a Node script and using an external package from NPM. We use `slugify` to convert strings into URL-friendly slugs.

```javascript
// 1intro/server.js
var slugify = require("slugify");

// Simple usage
console.log(slugify("Hello World")); // "Hello-World"

// Custom separator
console.log(slugify("Hello World", "_")); // "Hello_world"

// Advanced options
const c = slugify("some st&&&(^^^^&ring ", {
    lower: true,    // convert to lower case
    strict: true,   // remove special characters
    trim: true,     // trim leading/trailing spaces
});
console.log(c); // "some-standandandring"
```

### 💡 Key Points & Edge Cases

-   **`require()`**: This is the CommonJS syntax for importing modules.
-   **`slugify` options**: The `strict: true` option is crucial for removing characters that are not URL-safe. Without it, `slugify` might keep some symbols.
-   **`package.json`**: This file manages project metadata and dependencies. The `slugify` package is listed under `"dependencies"`.

---

## Chapter 2: Understanding Node.js Modules (`2modules`)

Node.js has two primary module systems. Understanding both is essential.

### CommonJS (CJS)

This is the traditional module system in Node.js. It's synchronous and uses `require` and `module.exports`.

```javascript
// 2modules/math.js (Exporter)
function add(a, b) {
  return a + b;
}
// Export an object containing the function
module.exports = { add };

// 2modules/index.js (Importer)
const math = require('./math');
console.log('CommonJS: 5 + 3 =', math.add(5, 3)); // 8
```

### ECMAScript Modules (ESM)

This is the modern, standardized module system. It's asynchronous and uses `import` and `export`. To enable ESM, use the `.mjs` extension or set `"type": "module"` in `package.json`.

```javascript
// 2modules/math.mjs (Exporter)
// Named export
export function add(a, b) {
  return a + b;
}
// Default export
const multiply = (a, b) => a * b;
export default multiply;

// 2modules/app.mjs (Importer)
import multiply, { add } from './math.mjs'; // Import default and named
console.log('ESM: 5 + 3 =', add(5, 3)); // 8
```

### 💡 Key Differences & Edge Cases

| Feature | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| **Loading** | Synchronous | Asynchronous |
| **Syntax** | `require`, `module.exports` | `import`, `export` |
| **Evaluation** | At runtime | At parse time (static) |
| **`this` context** | Refers to the module's exports | `undefined` at the top level |
| **Dynamic Use** | `require()` can be used inside functions/conditionals | `import()` is a function for dynamic loading |

-   **Edge Case (CJS)**: Never reassign `exports` directly (e.g., `exports = { add }`). It will break the reference that `module.exports` holds. Always add properties to it (`exports.add = ...`) or reassign `module.exports` itself.
-   **Edge Case (ESM)**: A module can have multiple `named` exports but only **one** `default` export.

---

## Chapter 3: Building with Express.js (`3express`)

Express is a fast, unopinionated, minimal web framework for Node.js.

### Core Concepts & Routing

-   **`app = express()`**: Creates an Express application.
-   **`app.listen()`**: Starts the server.
-   **Routing**: Defines how the application responds to a client request to a particular endpoint.

```javascript
// 3express/main.js
const app = express();
const port = 3000;

// GET request to the root URL (/)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST request
app.post('/', (req, res) => {
  res.send('Hello World ! post request');
});

// Route with a parameter
app.get('/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

// Sending a JSON response
app.get('/api', (req, res) => {
  res.json({ name: "Shubh", age: 20 });
});

// Sending a file
app.get('/index', (req, res) => {
  // Edge Case: Always use an absolute path or specify a root directory.
  res.sendFile('templates/index.html', { root: __dirname });
});
```

### Serving Static Files

The `express.static` built-in middleware serves static assets like HTML, CSS, and images.

```javascript
// 3express/main.js
// Any file in the 'public' folder is now accessible from the root URL.
// e.g., http://localhost:3000/shubh.txt
app.use(express.static('public'));
```

### Modular Routers (`express.Router`)

For better organization, group related routes into separate files using `express.Router`.

```javascript
// 3express/routes/blog.js
const express = require('express');
const router = express.Router();

// This handles GET requests to '/blog/'
router.get('/', (req, res) => {
  res.send('Blogs home page');
});

// This handles GET requests to '/blog/about'
router.get('/about', (req, res) => {
  res.send('About blog');
});

module.exports = router;

// 3express/main.js (Mounting the router)
const blog = require('./routes/blog.js');
// All routes from blog.js are now prefixed with '/blog'
app.use('/blog', blog);
```

---

## Chapter 4: Express Middleware (`4middlewares`)

Middleware functions are the backbone of Express. They are functions that execute during the request-response cycle and have access to the `req` and `res` objects.

### Custom Middleware

You can write your own middleware for tasks like logging, authentication, or modifying request objects.

```javascript
// 4middlewares/main.js

// Middleware 1: Logger
// This logs every request to the console and a file.
app.use((req, res, next) => {
    fs.appendFileSync('log.txt', `${Date.now()} is a ${req.method} request for ${req.url}\n`);
    console.log("m1: Logged request");
    next(); // CRITICAL: Passes control to the next middleware.
});

// Middleware 2: Modifying the request object
app.use((req, res, next) => {
    req.shubh = "Hello from shubh"; // Add a custom property to req
    console.log("m2: Modified request");
    next();
});

// Route handler that uses the modified request
app.get('/about', (req, res) => {
    res.send('Hello about! ' + req.shubh); // "Hello about! Hello from shubh"
});
```

### 💡 Middleware Edge Cases

-   **Order Matters**: Middleware is executed in the order it is defined.
-   **The `next()` function is vital**: If you don't call `next()`, the request will be left hanging, and the client will time out.
-   **Sending a Response**: If a middleware sends a response (e.g., `res.send()`), it **must not** call `next()`. Doing so will result in a "Cannot set headers after they are sent to the client" error, as the response is already finalized.

---

## Chapter 5: Interacting with the File System (`5clear-clutter`)

The built-in `fs` and `path` modules are powerful tools for working with files and directories.

This script organizes files into subdirectories based on their extension.

```javascript
// 5clear-clutter/index.js
import fs from "fs/promises"; // Modern promise-based API
import fsn from "fs"; // Traditional synchronous/callback API
import path from "path"; // For handling file paths

const basePath = "/path/to/your/files";
let files = await fs.readdir(basePath);

for (const item of files) {
    let ext = path.extname(item).substring(1); // e.g., "pdf"
    if (!ext || ext === "js" || ext === "json") continue;

    // Use path.join to create a platform-safe path
    const extDir = path.join(basePath, ext);

    // Check if the directory exists synchronously
    if (fsn.existsSync(extDir)) {
        await fs.rename(path.join(basePath, item), path.join(extDir, item));
    } else {
        await fs.mkdir(extDir);
        await fs.rename(path.join(basePath, item), path.join(extDir, item));
    }
}
```

### 💡 Key Points & Edge Cases

-   **`fs/promises` vs. `fs`**: The `fs/promises` module provides `async/await` support, which is cleaner than the traditional callback-based or synchronous methods.
-   **`path.join()` vs. String Concatenation**: Always use `path.join()` to combine path segments. It automatically handles path separators (`/` vs `\`) across different operating systems.
-   **`path.extname()`**: This is a more reliable way to get a file extension than `split('.')`.
-   **Hardcoded Paths**: The `basePath` is hardcoded. In a real application, this should be a dynamic value (e.g., from command-line arguments or a configuration file) to make the script portable.

---

## Chapter 6: Server-Side Rendering with EJS (`6ejs`)

EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.

```javascript
// 6ejs/main.js
const app = express();
app.set('view engine', 'ejs'); // Tell Express to use EJS

app.get('/', (req, res) => {
  // res.render() finds the template and passes data to it
  res.render('explanation', {
    name: 'Shubh',
    todos: ['Write code', 'Read docs'],
    isRaining: false,
    someHtml: '<strong>This is bold HTML!</strong>'
  });
});
```

### EJS Tags Explained

| Tag | Purpose | Security Note |
| :--- | :--- | :--- |
| **`<%= ... %>`** | **Outputs escaped data**. Converts characters like `<` and `>` to their HTML-safe equivalents (`&lt;`, `&gt;`). | **This is the default and safest tag.** Always use it for user-provided data to prevent XSS attacks. |
| **`<%- ... %>`** | **Outputs unescaped data**. Renders raw HTML. | **Use with extreme caution!** Only use for trusted data you control, otherwise you create a security vulnerability. |
| **`<% ... %>`** | **Logic tag**. For control flow like `if`, `for`, `while`. Does not produce any output. | N/A |
| **`<%- include(...) %>`** | **Includes a partial**. Embeds another EJS template file. | N/A |

```html
<!-- 6ejs/views/explanation.ejs -->
<h1>Hello, <%= name %>!</h1>

<!-- Loop -->
<ul>
  <% todos.forEach(function(todo) { %>
    <li><%= todo %></li>
  <% }); %>
</ul>

<!-- Unescaped HTML -->
<div><%- someHtml %></div>
```

### Using Partials

Partials are reusable EJS templates. They are perfect for components like headers, footers, and navigation bars.

```html
<!-- 6ejs/views/explanation.ejs -->
<%- include('partials/header') %>
<p>This is the main content.</p>
<%- include('partials/footer') %>
```

---

## Chapter 7: Database Interaction with Mongoose (`7mongoose`)

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

### Core Mongoose Concepts

1.  **Connection**: Connect your application to the MongoDB database.
2.  **Schema**: Define the structure and properties of your documents.
3.  **Model**: A constructor based on your schema. You use models to create, read, update, and delete documents.

```javascript
// 7mongoose/main.js
import mongoose from 'mongoose';
import { Todo } from "./models/Todo.js";

// 1. Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/todo');

// 7mongoose/models/Todo.js
import mongoose from "mongoose";

// 2. Define a Schema
const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    isDone: Boolean,
});

// 3. Create a Model
export const Todo = mongoose.model('Todo', TodoSchema);

// --- Using the model in main.js ---
app.get('/', async (req, res) => {
    // Create a new document instance
    const todo = new Todo({
        title: 'Learn Mongoose',
        desc: 'This is a new task.',
        isDone: false
    });
    // Save it to the database
    await todo.save();

    // Find a document
    let foundTodo = await Todo.findOne({ title: 'Learn Mongoose' });
    res.send(foundTodo);
});
```

### 💡 Key Points & Edge Cases

-   **Asynchronous Operations**: All Mongoose operations (like `.save()`, `.find()`, `.findOne()`) are asynchronous and return a promise. Always use `async/await` or `.then()` to handle them.
-   **ESM vs CJS**: The code in this chapter uses ES Modules (`import`/`export`), as defined by `"type": "module"` in its `package.json`.
-   **Connection String**: The MongoDB connection string (`mongodb://localhost:27017/todo`) should ideally be stored in an environment variable (`.env` file) rather than being hardcoded which is done here for practise purpose.