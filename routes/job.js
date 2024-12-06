const express = require("express");
const router = express.Router();
const Job = require("../Schema/job.schema");
const dotenv = require("dotenv");
const { route } = require("./user");
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id);
  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }
  res.status(200).json({ message: "Job deleted" });
});
