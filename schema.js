const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  
});

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => require('crypto').randomUUID(),
  },
  userEmail: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
  },
  time: {
    type: Number,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  startDate:{
    type:Date
  },
  endDate: {
    type: Date,
  },
  status:{
    type:String
  }
});


const UserModel=mongoose.model('users',UserSchema)
const ProjectModel = mongoose.model('Project', projectSchema);

module.exports={
    UserModel,
    ProjectModel
}
