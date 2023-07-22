const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");

const TodoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false, default: ""},
    isCompleted: {  type: Boolean, default: false },
    dueDate: {type: Date, required: true}
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = {Todo}
