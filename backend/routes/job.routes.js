import express from "express";
import { createJob, getAllJobs, getJobById, getAdminJobs } from "../controllers/job.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, createJob);

router.route("/getJobs").get(isAuthenticated, getAllJobs);

router.route("/getAdminJobs").get(isAuthenticated, getAdminJobs);

router.route("/getJob/:id").get(isAuthenticated, getJobById);

export default router;