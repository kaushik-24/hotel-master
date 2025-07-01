import path from "path";
import fs from "fs";
import Contact from "../models/contact.model";
import HttpException from "../utils/HttpException.utils";

class contactService {
  async getContact() {
    try {
      const contact = await Contact.findOne();
      if (!contact) {
        throw HttpException.notFound("Contact section not found");
      }
      return contact.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createContact(data: { address: string; email: string; phoneNumber: string[] }, file: Express.Multer.File) {
    try {
      // Check if contact section already exists
      const existingContact = await Contact.findOne();
      if (existingContact) {
        throw HttpException.badRequest("Contact section already exists. Please use update instead.");
      }

      // Ensure phoneNumber is an array of strings
      if (!Array.isArray(data.phoneNumber)) {
        throw HttpException.badRequest("Phone number must be an array of strings");
      }

      const contactData = {
        address: data.address,
        email: data.email,
        phoneNumber: data.phoneNumber.filter((phone) => phone.trim() !== ""),
        contactImage: `/uploads/${file.filename}`,
      };

      const newContact = await Contact.create(contactData);
      return newContact.toObject();
    } catch (error: any) {
      // Clean up uploaded file if creation fails
      if (file) {
        const filePath = path.join(__dirname, "../../uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async updateContact(data: { address?: string; email?: string; phoneNumber?: string[] }, file?: Express.Multer.File) {
    try {
      const existingContact = await Contact.findOne();
      if (!existingContact) {
        throw HttpException.notFound("Contact section not found");
      }

      const updateData: any = {
        address: data.address,
        email: data.email,
        phoneNumber: data.phoneNumber?.filter((phone) => phone.trim() !== ""),
      };

      if (file) {
        // Delete old image if it exists
        if (existingContact.contactImage) {
          const oldImagePath = path.join(__dirname, "../../", existingContact.contactImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.contactImage = `/uploads/${file.filename}`;
      }

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      // Ensure phoneNumber is an array of strings
      if (updateData.phoneNumber && !Array.isArray(updateData.phoneNumber)) {
        throw HttpException.badRequest("Phone number must be an array of strings");
      }

      const updatedContact = await Contact.findOneAndUpdate({}, updateData, { new: true });
      return updatedContact?.toObject();
    } catch (error: any) {
      // Clean up uploaded file if update fails
      if (file) {
        const filePath = path.join(__dirname, "../../Uploads", file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new contactService();
