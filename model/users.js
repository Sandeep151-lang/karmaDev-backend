const mongoose = require('mongoose')

const profile = new mongoose.Schema({
    name:{type:String},
    password:{type:String},
    email:{type :String}
},{timestamps:true})

module.exports = mongoose.model('profile',profile)