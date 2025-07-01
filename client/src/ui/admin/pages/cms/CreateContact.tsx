import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import axiosInstance from "@services/instance";

interface LabelProps {
  name: string;
  label: string;
}

const Label: React.FC<LabelProps> = ({ name, label }) => (
  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
    {label}
  </label>
);

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  required: string | boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, register, required, className, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    {...register(name, { required })}
    className={className}
    onChange={onChange}
  />
);

interface ContactData {
  address: string;
  phoneNumber: string[];
  contactImage: string;
  email: string;
}

interface FormData {
  address: string;
  email: string;
  phoneNumber: string[];
  contactImage?: FileList;
}

const ContactSection: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      address: "",
      email: "",
      phoneNumber: [""],
    },
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await axiosInstance.get("/api/contact");
      const data = response.data.data;
      setContactData(data);
      setValue("address", data.address);
      setValue("email", data.email);
      setValue("phoneNumber", data.phoneNumber || [""]);
      setPhoneNumbers(data.phoneNumber || [""]);
      setImagePreview(data.contactImage);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch contact data");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
    setValue("phoneNumber", newPhoneNumbers);
  };

  const addPhoneNumber = () => {
    const newPhoneNumbers = [...phoneNumbers, ""];
    setPhoneNumbers(newPhoneNumbers);
    setValue("phoneNumber", newPhoneNumbers);
  };

  const removePhoneNumber = (index: number) => {
    const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(newPhoneNumbers);
    setValue("phoneNumber", newPhoneNumbers);
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phoneNumber", JSON.stringify(data.phoneNumber));
    if (selectedFile) {
      formData.append("contactImage", selectedFile);
    }

    try {
      const response = contactData
        ? await axiosInstance.put("/api/contact", formData)
        : await axiosInstance.post("/api/contact", formData);
      setContactData(response.data.data);
      setImagePreview(response.data.data.contactImage);
      setPhoneNumbers(response.data.data.phoneNumber);
      setValue("phoneNumber", response.data.data.phoneNumber);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save contact data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineImage className="mr-2 text-blue-600" />
            {contactData ? "Edit Contact Section" : "Create Contact Section"}
          </h2>
          
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="address" label="Address" />
                <InputField
                  name="address"
                  type="text"
                  placeholder="Enter Address"
                  register={register}
                  required="Address is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div>
                <Label name="email" label="Email" />
                <InputField
                  name="email"
                  type="text"
                  placeholder="Enter sub heading"
                  register={register}
                  required="Sub heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-700 mb-2">Phone Numbers</h4>
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <InputField
                    name={`phoneNumber[${index}]`}
                    type="text"
                    placeholder="Enter phone number"
                    register={register}
                    required="Phone number is required"
                    className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneNumberChange(index, e.target.value)}
                  />
                  {phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhoneNumber(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              <button
                type="button"
                onClick={addPhoneNumber}
                className="mt-2 px-4 py-2 bg-[#019cec] text-white rounded-md hover:bg-[#017a9b]"
              >
                Add Phone Number
              </button>
            </div>
          </div>

          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Media
            </h3>
            <div>
              <Label name="contactImage" label="Contact Image" />
              <input
                type="file"
                accept="image/*"
                {...register("contactImage")}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#019cec] file:text-white hover:file:bg-[#017a9b] cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Contact Preview"
                    className="w-48 h-32 object-cover rounded-md border border-gray-300"
/>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                    }}
                    className="absolute top-1 right-1 bg-red-600/80 text-white text-xs px-2 py-1 rounded hover:bg-red-700/90 shadow"
                    aria-label="Remove image"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cms/home")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {contactData ? "Update Contact Section" : "Create Contact Section"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
