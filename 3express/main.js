const express = require('express');
// Import custom router modules.
// These files (e.g., './routes/blog.js', './routes/shop.js') are expected to export
// instances of `express.Router()`, which are mini-Express applications.
const blog = require('./routes/blog.js')
const shop=require('./routes/shop.js')

// The `app` object is the main Express application instance.
// It represents your entire web application and is responsible for:
// - Handling incoming HTTP requests.
// - Defining global middleware.
// - Mounting routers (sub-applications).
// - Starting the server.
const app = express();
const port = 3000;

// Middleware: express.static()
// This middleware serves static files (like HTML, CSS, JavaScript, images) from a specified directory.
// By default, Express does not serve static files. This line makes the 'public' folder accessible.
// Any file in the 'public' folder can be accessed directly via its URL (e.g., /image.png for public/image.png).
app.use(express.static('public'));

// Mounting Routers:
// `app.use()` is used here to mount router instances as middleware.
// When a request comes in, Express checks if its path matches the path specified in `app.use()`.
// If it matches, the request is then handed over to the corresponding router for further handling.

// Difference between `app` and `router`:
// - `app`: The main application object. It's the top-level entry point for your Express application.
//          It can define routes, use middleware, and mount other `app` or `router` instances.
// - `router`: An isolated instance of middleware and routes. Think of it as a "mini-application"
//             capable of performing middleware and routing functions. Routers are useful for:
//             - Organizing your application into logical, modular parts (e.g., all blog-related routes in one router).
//             - Applying middleware to a specific set of routes.
//             - Making your code more maintainable and scalable.

// Mounting the 'shop' router:
// All requests starting with '/shop' will be handled by the `shop` router.
// For example, a request to '/shop/products' would be handled by a route defined as '/' or '/products' within the `shop` router.
app.use('/shop', shop)

// You can use multiple static file directories if needed.
// app.use(express.static('file')); // Example of another static directory

// Mounting the 'blog' router:
// All requests starting with '/blog' will be handled by the `blog` router.
// This means that any endpoints defined within the `blog` router (e.g., '/', '/posts')
// will effectively become '/blog/' or '/blog/posts' when accessed through the main `app`.
app.use('/blog', blog) // This means that for any endpoints from /blog will be handled by the blog file at /routes/blog


// Route Definitions on the main `app` object:
// These are routes directly defined on the main Express application instance.
// They handle requests that match the specified path directly.

// GET request to the root path '/'
app.get('/', (req, res) => {
    console.log("Hey it's a get request")
    res.send('Hello World!');
});

// POST request to the root path '/'
app.post('/', (req, res) => {
    console.log("Hey it's a post request")
    res.send('Hello World ! post request');
});

// PUT request to the root path '/'
app.put('/', (req, res) => {
    console.log("Hey it's a put request") 
    res.send('Hello World ! put request');
});

// GET request to '/index'
app.get('/index', (req, res) => {
    console.log("Hey it's a get request for index")
    // `res.sendFile()` sends a file as the response.
    // `root: __dirname` specifies the root directory from which to resolve the file path.
    // This is important because `sendFile` expects an absolute path or a root option.
    res.sendFile('templates/index.html', {root: __dirname})
    // res.send('Hello World ! index'); // Alternative: sending plain text
}); 

// GET request to '/api'
// This route demonstrates sending JSON data as a response.
app.get('/api', (req, res) => {
    console.log("Hey it's a get request for api")
    res.json({
        name: "Shubh",
        age: 20,
        city: "Delhi"
    });
});

// Chained Route Handlers (commented out in original code, but good for explanation):
// `app.route()` allows you to define multiple HTTP method handlers for a single path.
// This helps in organizing routes for a specific endpoint.
// app.route('/user')
//     .get((req, res) => {
//         res.send('Get User');
//     })
//     .post((req, res) => {
//         res.send('Post User');
//     })
//     .put((req, res) => {
//         res.send('Put User');
//     });


// Route Parameters:
// Using ':name' in the path creates a route parameter.
// The value of this parameter can be accessed via `req.params.name`.
// This allows for dynamic routing based on parts of the URL.
app.get('/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

// Example of a route that would typically be moved to a router (like blog.js):
// This demonstrates how complex paths can be modularized.
// app.get('/blog/:slug/:second', (req, res)=>{
//     res.send(`Hello ${req.params.slug} and ${req.params.second}`);
// });


// Start the Express server.
// `app.listen()` binds the application to a specified port and starts listening for incoming connections.
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});



//to make url a variab;e