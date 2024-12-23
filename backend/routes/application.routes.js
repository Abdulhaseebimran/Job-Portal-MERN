import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { updateStatus, applyForJob, getApplicants, getAppliedJobs } from "../controllers/application.controllers.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyForJob);

router.route("/updateStatus/:id").post(isAuthenticated, updateStatus);

router.route("/:id/applicants").get(isAuthenticated, getApplicants);

router.route("/appliedjobs").get(isAuthenticated, getAppliedJobs);

export default router;