// Import the express module
const express = require('express')
// Create an Express application
const app = express()
// Define the port number where the server will listen
const port = 3000
   
// Set EJS as the view engine for Express
// This tells Express to use EJS to render templates in the 'views' folder
//view engine is responsible for rendering variable values in the HTML pages(.ejs files)
app.set('view engine', 'ejs')

// Define a route for the home page ('/')
app.get('/', (req, res) => {
  // Render the 'explanation.ejs' template
  // Pass an object with data to the template
  res.render('explanation', {
    name: 'Shubh',
    favoriteNumber: 7,
    isRaining: false,
    todos: ['Write code', 'Read docs', 'Have fun'],
    someHtml: '<strong>This is some bold text</strong>'
  });
});

// Route for explanation page
app.get('/explanation', (req, res) => {
  res.render('explanation', {
    name: 'Shubh',
    favoriteNumber: 42,
    isRaining: false,
    todos: ['Learn EJS', 'Build a project', 'Have fun!'],
    someHtml: '<strong>This is bold HTML!</strong>'
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console when the server is running
  console.log(`Server running at http://localhost:${port}`)
})
