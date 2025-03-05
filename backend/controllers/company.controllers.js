import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "All fields are required");
    }

    const company = await Company.findOne({ name: name });

    if (company) {
        throw new ApiError(400, "Company already exists");
    }

    const newCompany = await Company.create({
        name: name,
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

export const updateCompany = async(req,res)=>{
    try{
        // console.log("🔍 Incoming Request: ", req.params.id, req.body, req.file); 
        const {name,description,website,location} = req.body;
   
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "File is required", success: false });
        }
        // idher cloudinary aayega
       const fileUri = getDataUri(file);
       const cloudResponse = await cloudinary.uploader.upload(fileUri.content )
       const logo = cloudResponse.secure_url;

        const updateData = {name,description,website,location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        if(!company){
            res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company information updated",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

// export const updateCompanyOld = asyncHandler(async (req, res) => {
//     console.log("Request File:", req.file);
//     const { name, description, website, location } = req.body;
//     const file = req.file;
//      // idher cloudinary aayega
//      const fileUri = getDataUri(file);
//      const cloudResponse = await cloudinary.uploader.upload(fileUri.content )
//      const logo = cloudResponse.secure_url;

//     const updatedCompany = {
//         name,
//         description,
//         website,
//         location,
//     };

//     const updatedCompanyData = await Company.findByIdAndUpdate(
//         req.params.id,
//         updatedCompany,
//         { new: true }
//     );

//     if (!updatedCompanyData) {
//         throw new ApiError(404, "Company not found");
//     }    

//     return res.status(200).json(new ApiResponse(    
//         200,
//         "Company updated successfully",
//         updatedCompanyData
//     ));
// });