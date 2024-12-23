import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import applicationModel from "../models/application.models.js";
import jobModel from "../models/job.models.js";

export const applyForJob = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const jobId = req.params.id;

    if (!jobId) {
        throw new ApiError(400, "Job ID is required");
    }

    // Check if job exists
    const application = await applicationModel.findOne({ jobId }).populate("applications");

    if (!application) {
        throw new ApiError(404, "Job not found");
    }

    // Check if user has already applied for this job
    const job = await jobModel.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // Check if user has already applied for this job
    const existingApplication = await applicationModel.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    // Create new application
    const newApplication = await applicationModel.create({
        job: jobId,
        applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json(new ApiResponse(
        201,
        "Application submitted successfully",
        newApplication
    ));
});


export const getAppliedJobs = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const applications = await applicationModel.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
        path: "job",
        options: {
            sort: { createdAt: -1 },
        },
        populate: {
            path: "companyId",
            options: {
                sort: { createdAt: -1 },
            },
        }
    });

    if (!applications) {
        throw new ApiError(404, "No applications found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Applications fetched successfully",
        applications
    ))
});


export const getApplicants = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    const job = await jobModel.findById(jobId).populate({
        path: "applications",
        options: {
            sort: { createdAt: -1 },
        },
        populate: {
            path: "applicant",
            options: {
                sort: { createdAt: -1 },
            },
        }
    });

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Applicants fetched successfully",
        job.applications
    ));
});

export const updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const applicationId = req.params.id;
    const userId = req.user?.id;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const application = await applicationModel.findOne({ _id: applicationId });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    application.status = status;
    await application.save();

    return res.status(200).json(new ApiResponse(
        200,
        "Status updated successfully",
        application
    ));
});

