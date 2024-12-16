const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String

    },
    message:{
        type:String,
        require:true,
        
    }
   
    
})
const contact = mongoose.model("contact", UserSchema);
module.exports = contact;