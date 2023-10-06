const express = require('express');
const profile = require('../model/users');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../auth/tokenAuth');


router.post(`/login`,async(req,res)=>{
   // If user doesn't exist, return an error
   const { email, password } = req.body;
   
   const user = await profile.findOne({ email: req.body.email });
   try {
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const {email} = user

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    
        return res.json({ message: 'Login successful', token:token,email:email });
} catch (error) {
    return res.status(500).json({ error: 'Something went wrong ' });
}

})


router.post(`/register`,async(req,res)=>{
    const userExist = await profile.findOne({ email: req.body.email });
    try {
      if (userExist) {
        return res.status(409).send({ message: 'Email already exist' })
      } else {   
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        var user_register = await profile({ email:req.body.email,name:req.body.name,password:hashedPassword});
        await user_register.save();
        return res.status(201).send({ message: 'Registered Successfully'})  
      }
    } catch (error) {
      return res.status(500).send({ message: 'Something went wrong' })
    } 
})



 
  



module.exports = router