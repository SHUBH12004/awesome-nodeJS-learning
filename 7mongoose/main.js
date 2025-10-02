import mongoose from 'mongoose';
import express from "express";
import { Todo } from "./models/Todo.js";

//es modules 
let conn  = await mongoose.connect('mongodb://localhost:27017/todo')
const app=express();
const port = 3000;  

app.get('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: 'Learn Mongoose',
            desc: 'Learn how to use Mongoose with Node.js',
            isDone: false
        });
        await todo.save();

        let q=await Todo.findOne({ title: 'Learn Mongoose' });
        console.log(q);
        res.send(q) 
        // res.send('Hello World!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving todo');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});