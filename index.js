
const express=require('express');
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config();
const ConnectionDB = require("./db")
const bodyParser = require('body-parser');
const cors = require('cors');
const { 
    handleRegister,
    handleLogin,
    handlegetProject,
    handleAddProject,
    handleDelete,
    handleUpdate,

} = require('./services');



const app=express();
app.use(cors());
app.use(bodyParser.json());
ConnectionDB();

// const auth =async (req,res,next)=>{
// 
//     console.log(req.path)
//     if(req.path == '/login' || req.path == '/register' || req.path =='/'){
//         next()
//     }else{
//         try{
// 
// 
// 
//         }catch(err){
//             console.log("Authentication Error!!");
//             
//         }
//     }
// }
// 
// app.use(auth);

app.post('/register',(req,res)=>{
    handleRegister(req,res)
})

app.get('/login',(req,res)=>{
    handleLogin(req,res)
})

app.get('/getProject',(req,res)=>{
    handlegetProject(req,res)
})

app.post('/addProject',(req,res)=>{
    handleAddProject(req,res)
})

app.delete('/deleteProject',(req,res)=>{
    handleDelete(req,res)
})

app.put('/updateProject',(req,res)=>{
    handleUpdate(req,res)
})


app.get('/',(req,res)=>{
    res.send("Successfully running!!!")
})
app.listen(process.env.PORT,()=>{
    console.log("Server runnig...",process.env.PORT)
})