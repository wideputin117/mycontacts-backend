// @description Get all contacts
// @route GET /api/contacts
// @access public

// this will automatically throw error in catch
const asyncHandler = require("express-async-handler"); // use asyncHandler to handle try catch this is an inbuilt feature in express now dont have to write try catch
// require contactSchema from models file
const Contact =  require('../models/contactModel');
const { error } = require("console");

// this is get request
// to use express inbuilt async handler wrap whole asyc in asyncHandler
// asyncHandler automatically sends an err if there is an eroor
// with asyncHandler
const getContact = asyncHandler( async (req, res) =>{
    const contacts = await Contact.find();
    res.status(201).json(contacts);})


    // get contact by id
const getIdContact = asyncHandler (async (req, res) =>{
    // finding by id
    const contact = await Contact.findById(req.params.id); 
 // if the contact is not found return response 404
 if(!contact){
    res.status(404);
    throw new Error(`Contact Not Found`);
 }
    res.status(201).json(contact);
})


// to create a contact
// have to use async await for connecting to the database 
const createContact = async (req, res) =>{
    // for testing purposes
      // log out data coming from the client
    console.log("The sent data from the client is", req.body);
    
    // destructuring all the objects coming from the client side 
    // for handling the error
    const { name, email, phone } = req.body;
     // check if something is misiing if it is then throw an error
     if(!name || !email || !phone){
        res.status(500).json({message:"Invalid"});
        console.log("The sent data from the client is empty", req.body);
     }
     // to create a new instance
     const contact = await Contact.create({
        name,      // if the key and value are same we can just pass the key otherwise we will type both key and value
        email,
        phone,
     })
       // this is the else statement
    res.status(201).json(contact);
    }



// to delete a contact
const deleteContact = async (req, res) =>{ 
    // to fetch the contact by id
    const contact = await Contact.findByIdAndDelete(req.params.id);  // used findByIdAndDelete to delete the the contact
    if(!contact){
        res.json({message:`Contact with id not found ${req.params.id}`})
      
    }

    res.status(201).json({message:`Get Contact for the id ${req.params.id} & deleted content ${contact}`});
}


    // route for updating the contact

   /* const updateContact = async (req, res) =>{
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404).json({message:"not found"},contact);
        }// else update
        const updateContact = await Contact.findByIdAndupdate(req.params.id,req.body,
            { new: true }
        );

        res.status(201).json({message:`Get Contact for the id ${req.params.id}`},updateContact);
    }

*/
const updateContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: "not found" }, contact);
  } // else update
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json({ message: `Get Contact for the id ${updateContact}`});
};
    // we export all the routes using module.exports method
    module.exports = { getContact, createContact, deleteContact,updateContact , getIdContact}; // have to wrap in  curly braces because it is an objects