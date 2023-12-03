// this file is to create schema for the database

const mongoose= require('mongoose');

// schema for the database
const contactSchema= mongoose.Schema({
    // this will be used for which user the contact  is created
    user__id:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "User",    
    },

    name:{
        type: String,
        required: [true,"Please enter a name"],
    },

    email:{
        type: String,
        required: [true,"Please enter a email address"],
    },
    
    phone:{
        type: String,
        required: [true,"Please your phone number"],
    },
    
    
},{
    timestamps: true,
})

module.exports = mongoose.model("contacts", contactSchema);  // mongoose.model  first argument is the collection that will be created in the database if it is not their  