import { connectDB } from "../config/database.config"; // Correct path to database config
import { admins } from "../constant/admin"; // Admins data
import { IUser } from "../interface/user.interface"; // IUser interface
import User from "../models/auth.model"; // User model
import BcryptService from "../services/bcrypt.services"; // BcryptService for password hashing

async function seedAdmin(admin: IUser): Promise<void> {
    try {
        // Check if the admin already exists
        const existingAdmin = await User.findOne({ email: admin.email });
        if (existingAdmin) {
            console.log(`Skipping ${admin.email}, admin already exists`);
            return;
        }

        // Hash the password and save new admin
        const newAdmin = new User(admin);
        newAdmin.password = await new BcryptService().hash(admin.password);
        await newAdmin.save();
        console.log(`Added ${admin.email} admin to the database`);
    } catch (error) {
        console.log(`Failed to seed ${admin.email} admin 💣`);
        console.error(error);
    }
}

async function seedAdmins(admins: IUser[]): Promise<void> {
    try {
        // Connect to MongoDB before seeding data
        await connectDB();

        // Iterate through each admin and seed them
        for (const admin of admins) {
            await seedAdmin(admin);
        }
    } catch (error) {
        console.log("Failed to seed admin 💣");
        console.error(error);
    } finally {
        process.exit(0);  // Exit the process after seeding is done
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
    void seedAdmins(admins);
} else {
    console.error("Invalid argument");
    process.exit(1);
}
