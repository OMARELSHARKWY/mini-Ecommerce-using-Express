const mongoose = require('mongoose');
const { Types } = mongoose;

const emailValidator = function(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

const usersSchema = new mongoose.Schema({
    _id:{
        type: Types.ObjectId, 
        required : [true , "Id is Required"] ,
        min:0 ,
        auto : true,
    },
    name : {
        type : String ,
        required : [true , "Category name is required"]
    },
    email:{
        type : String,
        unique : true,
        require : [true , "Email is Required"],
        validate : [emailValidator, "Email Address is not Valid"]
    },
    image:{
        type : String,
        required : true,
    }
})

const User = mongoose.model('User', usersSchema);
module.exports=User;