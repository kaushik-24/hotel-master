import mongoose, { Schema } from "mongoose";
import { ROLE } from "../constant/enum"; // Enum for user roles
import { Message } from "../constant/messages"; // Message constants for validation
import { emailRegex, phoneRegex } from "../constant/regex"; // Regex constants for email/phone validation
import { IUser } from "../interface/user.interface"; // User interface

// Define the user schema
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [emailRegex, Message.validEmailAddress],  // Email validation
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: false,
            match: [phoneRegex, Message.validPhoneNumber],  // Phone validation
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE.USER,  // Default role for the user
        },
    },
    {
        timestamps: true,  // Auto add createdAt and updatedAt fields
        
    }
);

// Create the User model from the schema
const User = mongoose.model<IUser>("User", userSchema);

export default User;
