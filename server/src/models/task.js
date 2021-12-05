import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.ObjectId;

const TasksSchema = mongoose.Schema({
    nome: {type: String},
    isComplete: {type: Boolean, default: false}
})

const Tasks = mongoose.model('Tasks', TasksSchema)

export default Tasks