import mongoose, { Schema } from "mongoose";
import { IPage } from "../interface/otherPage.interface";



const pageSchema = new Schema<IPage>(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
    },
                shortdesc: {
            type: String,
            required: false,
            unique: false,
        },
         heading: {
            type: String,
            required: false,
            unique: false,
        },
         longdesc: {
            type: String,
            required: false,
            unique: false,
        },
       
        pageImage: { type: String},
        
    }, { timestamps: true }
);

const Page = mongoose.model<IPage>("Page", pageSchema);

export default Page;


