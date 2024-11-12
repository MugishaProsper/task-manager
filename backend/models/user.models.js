import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
  fullName : { type : String, required : true },
  email : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  tasks : [Task]
}, { timestamps : true });

const taskSchema = mongoose.Schema({
  owner : { type : mongoose.Types.ObjectId, ref : 'User' },
  description : { type : String, required : true },
  createdAt : { type : String, required : true, default : Date.now() },
  dueAt : { type : String, required : true },
  status : { type : String, enum : ['pending', 'done'], default : 'pending' }
})

export const User = mongoose.model('User', userSchema);
export const Task = mongoose.model('Task', taskSchema);

export default { User, Task }