const express = require('express');
const course = require('../model/items');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../auth/tokenAuth');


router.post('/create',auth,async(req,res)=>{
    try {
       const resp=  await course({
            c_name:req?.body?.c_name,
            c_description:req?.body?.c_description,
            c_price: req?.body?.c_price,
            createdBy:req?.userId
         })
         resp.save()
         return res.status(201).json({message:'Course created.'})
         
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
})


router.get('/list',auth,async(req,res)=>{
    try {
      const resp =  await course.find()
       return res.status(200).json(resp)
    } catch (error) {
        return res.status(500).json({message:`Something went wrong`})
    }
})

router.put('/update/:_id',async (req,res)=>{
    try {
        await course.findByIdAndUpdate({ _id: req?.params?._id }, req.body ,{new:true, upsert: false}) 
           return res.send("Course updated successfully")
        
    } catch (error) {
        return res.status(500).json({message:`Something went wrong`})
    }
  })


  router.delete('/delete/:_id',async(req,res)=>{
    try {
        const {_id} =req?.params
        await course.deleteOne({ _id: _id }).then(() => {
            return res.json("Course deleted successfully")
        }).catch((err)=>res.json('Course not deleted'))

    } catch (error) {
        return res.status(200).json({message:"Something went wrong"})
    }
  })



module.exports = router