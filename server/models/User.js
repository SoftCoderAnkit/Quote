const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String

    },
    password:{
        type:String,
        require:true,
        unique:true
    }
   
    
})
const User = mongoose.model("Users", UserSchema);
module.exports = User;