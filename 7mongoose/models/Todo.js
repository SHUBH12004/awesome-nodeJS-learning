import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    title: String,
    desc:String, 
    isDone:Boolean,
});

//ejsm export const Todo = mongoose.model('Todo', TodoSchema);
export const Todo = mongoose.model('Todo', TodoSchema);