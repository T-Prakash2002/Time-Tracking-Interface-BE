
const mongoose = require('mongoose')
const dotenv=require('dotenv')
dotenv.config();


const ConnectionDB=async()=>{

    try{

        await mongoose.connect(process.env.MONGODB_URI)
        
        if(mongoose.connection.readyState === 1){
            console.log("DB Connected");
            
        }

    }
    catch(err){
        console.log("DB Connection Failed!!")
    }

}

module.exports=ConnectionDB

