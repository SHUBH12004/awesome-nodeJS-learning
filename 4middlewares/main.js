const express = require('express')
const app = express()
const port = 3000
const fs=require('fs')

//middleware example -> using app.use
//so it grabs the req and checks if the resource in public folder(shubh.txt  ), then serves from there only 
app.use(express.static('public')) //built in middleware to serve static files from the public directory

//middleware 1 -> logger for appl.
//middleware has access to req and res object
//so we can modify the req and res objects
app.use((req, res, next)=>{
    fs.appendFileSync('log.txt', `${Date.now()} is a ${req.method} request for ${req.url}\n`, {flag: 'a'})
    // console.log(req.headers)
    console.log(`${Date.now()} is a ${req.method} request for ${req.url}`)
    // res.send("Hello from m1") //this will send a response 
    //now it will throw err when try to do res.send() in next middleware
    //otherwise do not use next()
    //because the response has already been sent
    //cannot set headers after they are sent to the client
    //so we cannot send another response after this
    next() //without this, the req will remain hanging
    //next gives control to the next middleware function in the stack
})

app.use((req, res, next)=>{
    //order matters-> later set value always considered
    req.shubh = "Hello from shubh"
    console.log("m2")
    next()
})
  

//third party middleware-> can be installed using npm
//example of third party middleware
// const morgan = require('morgan')
// app.use(morgan('tiny')) //logs the request in a concise format
//morgan is a logging middleware that logs the request details to the console
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('Hello about!'+ req.shubh)
  })

  app.get('/contact', (req, res) => {
    res.send('Contact me')
  })
  
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


