const mongoose = require("mongoose");

const contactScheme = mongoose.Schema({
    name:{
        type:String,
        required: [true, "please add your name"],
    },
    email: {
        type:String,
        required:[true,"please add your email"],
    },
    phone:{
        type:String,
        required:[true,"please add your phone"],
    },

},{
    timestamps:true
});

module.exports = mongoose.model("Contact",contactScheme);