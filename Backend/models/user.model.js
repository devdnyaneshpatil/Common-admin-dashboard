const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

const UserModel= mongoose.model("user",userSchema)


module.exports=UserModel