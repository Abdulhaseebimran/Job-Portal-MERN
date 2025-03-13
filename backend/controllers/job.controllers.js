import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jobModel from "../models/job.models.js";

export const createJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, salary, location, jobType, position, experienceLevel, companyId } = req.body;
    if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experienceLevel || !companyId) {
        throw new ApiError(400, "All fields are required");
    }

    const userId = req.user?.id;

    const newJob = await jobModel.create({
        title,
        description,
        requirements: requirements.split(','),
        salary: Number(salary),
        location,
        jobType,
        position,
        experienceLevel,
        companyId,
        created_by: userId,
    });

    return res.status(201).json(new ApiResponse(
        201,
        "Job created successfully",
        newJob
    ));
});

export const getAllJobs = asyncHandler(async (req, res) => {
    const keywords = req.query.keywords || "";

    const query = {
        $or: [
            { title: { $regex: keywords, $options: "i" } },
            { description: { $regex: keywords, $options: "i" } }
        ]
    };

    const jobs = await jobModel.find(query).populate({
        path: "companyId", select: "name location"
    }).sort({ createdAt: -1 });

    if (!jobs) {
        throw new ApiError(404, "No jobs found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Jobs fetched successfully",
        jobs
    ));
});

export const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Job fetched successfully",
        job
    ));
});


export const getAdminJobs = asyncHandler(async (req, res) => {
    const adminId = req.id;
    const jobs = await jobModel.find({ created_at: adminId });

    if (!jobs) {
        throw new ApiError(404, "No jobs found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Jobs fetched successfully",
        jobs
    ));
});
