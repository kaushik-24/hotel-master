import mongoose, { Schema } from "mongoose";
import { IOtherPage } from "../interface/otherPage.interface";



const otherpageSchema = new Schema<IOtherPage>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true }
);

const Page = mongoose.model<IOtherPage>("Other Page", otherpageSchema);

export default Page;

