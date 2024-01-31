const asyncHandler = require("express-async-handler");
const ContactMogose = require("../model/contactModel");


const getContacts = asyncHandler(async(req,res) =>{
    const contact = await ContactMogose.find();
    res.status(200).json(contact);
});

const createContact = asyncHandler(async(req,res)=>{
    console.log("the request is ",req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("tất cả các trường dữ liệu ko được trống")
    }
    const contact = await ContactMogose.create({
        name,
        email,
        phone
    })
    res.status(200).json(contact);
})

const getContact = asyncHandler(async (req,res) =>{
    const contact = await ContactMogose.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("khong tim thay contact");
    }

    res.status(200).json(contact);
})


const updateContact = asyncHandler(async (req,res) =>{
    const contact = await ContactMogose.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("khong tim thay contact");
    }
    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("user ko có quyền update contact người khác")
    }
  
    const updateContact = await ContactMogose.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json(updateContact);
})

const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await ContactMogose.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("khong tim thay contact");
    }
    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("user ko có quyền delete contact người khác")
    }

   const removeContact = await ContactMogose.findByIdAndDelete(req.params.id)
    res.status(200).json(removeContact);
})

module.exports = {getContact,createContact,deleteContact,updateContact,getContacts};