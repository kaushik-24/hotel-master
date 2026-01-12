"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../config/database.config")); // Correct path to database config
const admin_1 = require("../constant/admin"); // Admins data
const auth_model_1 = __importDefault(require("../models/auth.model")); // User model
const bcrypt_services_1 = __importDefault(require("../services/bcrypt.services")); // BcryptService for password hashing
async function seedAdmin(admin) {
    try {
        // Check if the admin already exists
        const existingAdmin = await auth_model_1.default.findOne({ email: admin.email });
        if (existingAdmin) {
            console.log(`Skipping ${admin.email}, admin already exists`);
            return;
        }
        // Hash the password and save new admin
        const newAdmin = new auth_model_1.default(admin);
        newAdmin.password = await new bcrypt_services_1.default().hash(admin.password);
        await newAdmin.save();
        console.log(`Added ${admin.email} admin to the database`);
    }
    catch (error) {
        console.log(`Failed to seed ${admin.email} admin 💣`);
        console.error(error);
    }
}
async function seedAdmins(admins) {
    try {
        // Connect to MongoDB before seeding data
        await (0, database_config_1.default)();
        // Iterate through each admin and seed them
        for (const admin of admins) {
            await seedAdmin(admin);
        }
    }
    catch (error) {
        console.log("Failed to seed admin 💣");
        console.error(error);
    }
    finally {
        process.exit(0); // Exit the process after seeding is done
    }
}
// Get the argument passed to the script
const args = process.argv[2];
if (!args) {
    console.error("Please provide an argument");
    process.exit(1);
}
// Run the seeding process if the argument is "seed"
if (args === "seed") {
    void seedAdmins(admin_1.admins);
}
else {
    console.error("Invalid argument");
    process.exit(1);
}
