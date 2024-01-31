const mongoose = require("mongoose");

const UserMogo = mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add your username"]
    },
    email:{
        type:String,
        required:[true,"please add your email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"please add your password"]
    },
},{
    timestamps:true
})

module.exports = mongoose.model("user",UserMogo);
