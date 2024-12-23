import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company.models.js";

export const registerCompany = asyncHandler(async (req, res) => {
    const { companyName } = req.body;

    if (!companyName) {
        throw new ApiError(400, "All fields are required");
    }

    const company = await Company.findOne({ name: companyName });

    if (company) {
        throw new ApiError(400, "Company already exists");
    }

    const newCompany = await Company.create({
        name: companyName,
    });

    res.status(201).json(new ApiResponse(
        201,
        "Company registered successfully",
        newCompany
    ));
});


export const getCompany = asyncHandler(async (req, res) => {
    const userId = req.id;
    const company = await Company.find(userId);

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Company fetched successfully",
        company
    ));
});

export const getCompanyById = asyncHandler(async (req, res) => {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Company fetched successfully",
        company
    ))
});


export const updateCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updatedCompany = {
        name,
        description,
        website,
        location,
    };

    const updatedCompanyData = await Company.findByIdAndUpdate(
        req.params.id,
        updatedCompany,
        { new: true }
    );

    if (!updatedCompanyData) {
        throw new ApiError(404, "Company not found");
    }    

    return res.status(200).json(new ApiResponse(    
        200,
        "Company updated successfully",
        updatedCompanyData
    ));
});