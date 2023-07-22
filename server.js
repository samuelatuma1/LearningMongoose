let express = require("express");
let {Todo} = require("./DataAccess/Schema/TodoSchema")

// getting-started.js
const mongoose = require('mongoose');

async function mainDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

mainDb().catch(err => console.log(err));

let app = express();

app.use(express.json())

app.post("/todo", async (req, res) => {
    try{
        const {title, description, isCompleted, dueDate} = req.body;
        console.log("Todo", Todo);
        const todoToSave = new Todo({title: title, description: description, isCompleted: isCompleted, dueDate: dueDate});
        let savedTodo =  await todoToSave.save();

        return res.json(savedTodo);
    }
    catch(err){
        return res.json(err);
    }
})

app.get("/todo", async (req, res) => {
    let allTodos = await Todo.find();
    return res.json(allTodos);
})

app.get("/todo/:id", async (req, res) => {
    let id = req.params.id;
    let todo  = await Todo.findOne({_id: id});
    let todo2 = await Todo.findById(id); // same with first call
    return res.json(todo2);
})

app.post("/find/todo", async (req, res) => {
    let query = req.body;
    let matchingtodos = await Todo.where(query); // where and find do similar things, but where is a little more dynamic
    
    return res.json(matchingtodos);
})

app.patch("/todo/:id", async (req, res) => {
    let update = req.body;
    let id = req.params.id;
    //let updatedTodo = await Todo.updateOne({_id: id}, update); // same as what is below
    updatedTodo = await Todo.findByIdAndUpdate(id, update);
    let responseObject = await Todo.findById(id)
    return res.json(responseObject)
})

app.delete("/todo/:id", async (req, res) => {
    let id = req.params.id;
    // let deleteObject = await Todo.deleteOne({_id: id}) // same as what is below
    let deleteObject2 = await Todo.findByIdAndDelete(id)

    return res.json(deleteObject);
})

app.listen(3000, () => console.log("App is running at PORT: 3000"))
