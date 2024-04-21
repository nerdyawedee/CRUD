const mongoose = require("mongoose");
const DB = "mongodb+srv://CURD-OPERATION:123qwe.@cluster0.d38funb.mongodb.net/mernstack?retryWrites=true&w=majority";

const Mongodb = async() => {
    try{
        await mongoose.connect(DB);
        console.log("Connected");
    }
    catch(error){
        console.log("Error",error);
    }
}


module.exports= Mongodb;