const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
     
},{
    versionKey:false
})

const userModel=new mongoose.model("userdetails",userSchema)

module.exports={
    userModel
}