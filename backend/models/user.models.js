import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        }
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true,
    },
    profile: {
        bio: {
            type: String,
        },
        skills: [{
            type: String,
        }],
        resumeOriginalName: {
            type: String,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        profilePhoto: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;