//@ conttroller routes for registering the user
// @ route POST api/users/register
//@access public

const expressAsyncHandler = require("express-async-handler");

const registerUser= expressAsyncHandler( async(req,res)=>{
res.json({message:"Register the user successfully"})
});

//@ conttroller routes for registering the user
// @ route POST api/users/current
//@access private
const loginUser = expressAsyncHandler(async(req,res)=>{
    res.json({message:"Login the user successfully"})
});

//@ conttroller routes for registering the user
// @ route POST api/users/current
//@access private
const currentUser = expressAsyncHandler(async(req,res)=>{
    res.json({message:"Current user "})
});

module.exports={ registerUser, loginUser, currentUser };