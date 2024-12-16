const express = require('express');
const router = express.Router();
const contact = require('../models/contact');

// Signup route
router.post("/contact", async(req,res)=>{
    try{
        const info = new contact(req.body);
        const saved =await info.save();
        if(saved){
            res.status(201).json({messege:"data submit ho gya!!"});
        }else{
            res.status(400).json({error:"your data not submited"});
        }
    }catch(error){
        res.status(500).json({error:"error server"})
    }
})

module.exports = router;
