const mongoose = require('mongoose')

const items = new mongoose.Schema({
    c_name:{type:String},
    c_description:{type:String},
    c_price:{type :Number},
    // c_slug:{type:String},
    createdBy:{type:mongoose.SchemaTypes.ObjectId,ref:"profile"}
},{timestamps:true})

module.exports = mongoose.model('items',items)