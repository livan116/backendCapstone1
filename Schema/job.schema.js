const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
     companyName:{
        type:String,
        required:true,
     },
     jobPosition:{
        type:String,
        required:true,
     },
     salary:{
        type:Number,
        required:true,
     },
     jobType:{
        type:String,
        required:true,
        enum:["full-time","part-time","contractor","internship",'freelancer'],
     },
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
     }
})

const jobModel = mongoose.model("job",jobSchema)

module.exports = jobModel