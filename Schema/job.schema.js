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
        type:String,
        required:true,
     },
     jobType:{
        type:String,
        required:true,
        enum:["full-time","part-time","contractor","internship",'freelancer'],
     }
})

const jobModel = mongoose.model("job",jobSchema)

module.exports = jobModel