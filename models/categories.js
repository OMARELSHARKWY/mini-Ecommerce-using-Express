const mongoose = require('mongoose');
const { Types } = mongoose;
const categoriesSchema = new mongoose.Schema({
    _id:{
        type: Types.ObjectId, 
        required : [true , "Id is Required"] ,
        min:0 ,
        auto : true
    },
    name : {
        type : String ,
        required : [true , "Category name is required"]}
})

const Category = mongoose.model('Category', categoriesSchema);
module.exports=Category;


// we can export like this
// module.exports=mongoose.model('Category', categoriesSchema);