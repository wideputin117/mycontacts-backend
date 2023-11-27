const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Error } = require("mongoose");

//@ conttroller routes for registering the user
// @ route POST api/users/register
//@access public
const registerUser= expressAsyncHandler( async (req,res)=>{
            // getting the data body sent from clienct
            const { username, email , password } = req.body;
            // to check if the data is insufficient 
        if(!username || !email || !password){
            res.status(400);
            throw new Error("Please enter all the required fields");
        }
        //  first check if the user exists already if not then register the user
        const userAvailable = await User.findOne({email});
        
        // if to check if the user exists if he does we will throw an err
        if(userAvailable){
            res.status(400);
            throw new Error("User already exists");
        }
        // if the user is not present we will create a new user
        // hashing password becz we cant store passwor in the database directly
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password: " + hashedPassword);
        
        // now we will create a new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        
        if(user){
            res.status(200).json({_id: user.id, email: user.email});
        }else{
            res.status(400);
            throw new Error("User data is not valid");
        }

res.json({message:"Register the user successfully"})
});





//@ conttroller routes for registering the user
// @ route POST api/users/current
//@access private
const loginUser = expressAsyncHandler(async (req,res)=>{
   // we will fetch the email, password to check for login
   const { email, password } = req.body;
   // check for email and password
   if(!email || !password){
    res.status(400);
    throw new Error("User not found");
   }
   // find the user by email
   const user = await User.findOne({ email });
   
   // compare the pashword with hashed password
   if(user && (await bcrypt.compare(password, user.password))){
    // if the condition is true this block will run
    // access token
    const accessToken = jwt.sign({
        // passing the user object as payload
        user:{
               username: user.username,
               email: user.email,
               id: user.id,
            },
      }, 
         // access token secret
         process.env.ACCESS_TOKEN,
         { expiresIn:"60m"  }
    );
    res.status(200).json({ accessToken });
   }
   else {
    res.status(401);
    throw new Error("Email or pasword not valid");
   }
});




//@ conttroller routes for registering the user
// @ route POST api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req,res)=>{ 
    res.json(res.json(req.user));
});

module.exports={ registerUser, loginUser, currentUser };