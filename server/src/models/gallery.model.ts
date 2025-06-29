import mongoose, { Schema } from "mongoose";

interface IGallery {
  image: string,
}

const gallerySchema = new Schema<IGallery>(
    {
        image: { type: String},
        
    }, { timestamps: true }
);

const Gallery = mongoose.model<IGallery>("Gallery", gallerySchema);

export default Gallery;


