const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email:{
      type:String,
      unique:true,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   fullName:{
      type:String,
      required:true
   },
   dateUpdated:Date,
   dateCreated:{
      type:Date,
      default:Date.now
   },
   role:{
      type:String,
      default:'user'
   }
});

module.exports = mongoose.model('User', userSchema);