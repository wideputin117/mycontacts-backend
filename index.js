// this is the main file to run the server

// to create the server
const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const app = express();
const port = process.env.PORT || 5000; // this will get the port number from env or will run on the 5000

// calling connectDb for connecting to the db

connectDb();

// we need to use app.use(express.json())
// this parses the icoming data coming from the client side this is an inbuilt express method
app.use(express.json()); // this is important for parsing the data coming from the client side


// this is middleware function for the routes to get,post,put,delete the route
app.use("/api/contacts", require("./routes/contactRoutes")); // this will get the contact routes from contactRoutes.js file

// this is our register and login middleware routes
app.use("/api/users", require("./routes/userRoutes")); // this will get the contact routes from contactRoutes.js file

// middleware making use of error handler from the errorHandler file
app.use(errorHandler);


// this will run the server on the port
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});