import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {type: String,required: true},
  description: {type: String,required: true},
  status: {type: String,enum: ['Todo', 'In Progress', 'Completed'],default: 'Todo'},
  priority: {type: String,enum: ['High', 'Medium', 'Low'],default: 'Medium'},
  dueDate: {type: Date},
  createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date,default: Date.now},
  tags: {type: [String],default: []},
  assigned_to: {id: {type: String,},name: {type: String,},email: {type: String,}},
  assigned_by: {id: {type: String,},name: {type: String,},email: {type: String,}},
  // attachments: [
  //   {id: {type: String},url: {type: String},name: {type: String}}
  //   ],
  // comments: [
  //   {
  //     id: {type: String},author: {id: {type: String},name: {type: String},email: {type: String}},
  //     text: {type: String},
  //     createdDate: {type: Date,default: Date.now},
  //   },
  // ],
});

const Task = mongoose.model('task', taskSchema);

export default Task;
