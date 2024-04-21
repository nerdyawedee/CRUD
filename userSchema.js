const mongoose = require("mongoose");
const {Schema}= mongoose;

const userSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    add:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
});

const users = new mongoose.model('users', userSchema);
module.exports = users;