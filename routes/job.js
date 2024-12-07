const express = require("express");
const router = express.Router();
const Job = require("../Schema/job.schema");
const dotenv = require("dotenv");
const { route } = require("./user");
const authMiddleware = require("../middleware/auth");
dotenv.config();

router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(200).json(job);
});

router.delete("/:id", authMiddleware,async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  console.log(job)
  const userId = req.user.id;
  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }
  if(userId !== job.user.toString()){
    return res.status(401).json({message:"You are not authorized to delete this job"})
  }
  await job.deleteOne({_id:id})
  res.status(200).json({ message: "Job deleted" });
});

router.post("/",authMiddleware,async(req,res)=>{
  const {companyName,jobPosition,salary,jobType} = req.body;
  if(!companyName || !jobPosition || !salary || !jobType){
    return res.status(400).json({message:"Missing required fields"})
  }
  try{
    const user = req.user;
    const job = await Job.create({
      companyName,
      jobPosition,
      salary,
      jobType,
      user:user.id,
    });
    res.status(200).json(job)
  }catch(error){
    res.status(500).json({message:"Error in creating job"})
  }
})

router.put('/:id',authMiddleware,async(req,res)=>{
  const {companyName,jobPosition,salary,jobType} = req.body;
  const {id} = req.params;
  const job = await Job.findById(id);
  if(!job){
    return res.status(404).json({message:"Job not found"})
  }
  if(job.user.toString() !== req.user.id){
    return res.status(401).json({message:"You are not authorized to update this job"})
  }
  try {
    await Job.findByIdAndUpdate(id,{
      companyName,
      jobPosition,
      salary,
      jobType
    })
    res.status(200).json({message:"Job updated"})
  } catch (error) {
    res.status(500).json({message:"Error in updating job"})
  }
})

module.exports = router;
