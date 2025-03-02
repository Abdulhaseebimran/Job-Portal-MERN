import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
        throw new ApiError(400, "All fields are required");
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // Check if email already exists
    const user = await User.findOne({ email: email });
    if (user) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
        profile: {
            profilePhoto: cloudResponse.secure_url,
        },
    });

    return res.status(201).json(new ApiResponse(
        201,
        "User created successfully",
        newUser
    ));

});

export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if email exists
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ApiError(400, "Invalid email or password not found");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid email or password not found");
    }

    if (user.role !== role) {
        throw new ApiError(400, "Account does not exist for this role");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    // Set JWT token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profile: user.profile
    }

    return res.status(200).json(new ApiResponse(
        200,
        "User logged in successfully",
        userData,
    ));
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});


export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, profile, bio, skills } = req.body;

    // if (!fullName || !email || !phoneNumber || !profile, !bio || !skills) {
    //     throw new ApiError(400, "All fields are required");
    // }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (profile) user.profile = profile;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
    }
    await user.save();

    const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profile: user.profile
    }

    return res.status(200).json(new ApiResponse(
        200,
        "User profile updated successfully",
        userData,
    ));

});

