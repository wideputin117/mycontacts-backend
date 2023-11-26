// in this controllers handles are written in they handle all the request and send them to the  client side


// will config routs in this
const express = require('express');
const router = express.Router();
const { getContact, createContact, deleteContact, updateContact, getIdContact }  = require("../controllers/contactCpntroller");
// we will declare for all methods

// in all the arguements for the http request we have declared routes in separate file and are importing them here to keep things simple
// No need to get confused here
 
// this is get method
router.route('/').get(getContact); 
// since both get and post route are similar we can also write them like this

// router.route('/').get(getContact).post(postContact); //

// we can do this with other routes who have similar req, res
 
// to get an contact by id
router.route('/:id').get(getIdContact);
     
// this is to create a new contact
router.route('/').post(createContact);

// this is to update a contact
router.route('/:id').put(updateContact);

// this is to delete a contact
router.route('/:id').delete(deleteContact)

    module.exports = router;