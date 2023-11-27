// contains schema for the user to create
const mongoose = require('mongoose');

// declaring the schema

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please add the user name"],
    },
    email:{
        type: String,
        required:[true,"Please add the user email"],
    },
    password:{
        type: String,
        required:[true, "Please add the user password"],
    }
  },
        {
            timestamps: true,
        } 
);

module.exports = mongoose.model('User',userSchema);