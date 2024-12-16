const express = require('express');
const router = express.Router();
const Quotes = require('../models/Quotes');

// Signup route


router.post("/Quotes", async(req,res)=>{
    try{
        const info = new Quotes(req.body);
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



router.get("/Quotes", async(req,res)=>{
    try{
        
        const data =await Quotes.find();
        res.status(200).send(data);
    }catch(error){
        res.status(500).json({message : " server error", details: error.message})
    }
});








module.exports = router;