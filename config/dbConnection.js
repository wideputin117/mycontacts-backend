// this file is for connecting to the database

// requiring mongoose
const mongoose = require('mongoose');
// connection uri 
const URI= process.env.CONNECTTION_STRING;

// create function to connect to the database
const connectDb= async ()=>{

    try{
    const connect = await mongoose.connect(URI);
    console.log("Database Connected", connect.connection.host, connect.connection.name );
    }catch(err){
        // log err if ran into it
        console.log(err);
        // after that exit the process
        process.exit(1);
    }
}



module.exports= connectDb;
 
