import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
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
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, register, required, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    {...register(name, { required })}
    className={className}
  />
);

interface HistorySection {
  heading: string;
  description: string;
  image?: FileList;
}

interface HistoryData {
  title: string;
  mainDescription: string;
  sections: HistorySection[];
}

const HistoryForm: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<HistoryData>({
    defaultValues: {
      title: "",
      mainDescription: "",
      sections: [{ heading: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await axiosInstance.get("/api/history");
      const data = response.data.data;
      setHistoryData(data);
      setValue("title", data.title);
      setValue("mainDescription", data.mainDescription);
      setValue("sections", data.sections);
      setImagePreviews(data.sections.map((section: HistorySection) => section.image || null));
      setSelectedFiles(data.sections.map(() => null));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch history data");
    }
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);

      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = URL.createObjectURL(file);
      setImagePreviews(newImagePreviews);
    }
  };

  const removeImage = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = null;
    setSelectedFiles(newSelectedFiles);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = null;
    setImagePreviews(newImagePreviews);
  };

  const onSubmit = async (data: HistoryData) => {
    setError(null);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("mainDescription", data.mainDescription);
    formData.append("sections", JSON.stringify(data.sections.map(section => ({
      heading: section.heading,
      description: section.description,
    }))));

    selectedFiles.forEach((file, index) => {
      if (file) {
        formData.append("images", file);
      }
    });

    try {
      const response = historyData
        ? await axiosInstance.put("/api/history", formData)
        : await axiosInstance.post("/api/history", formData);
      setHistoryData(response.data.data);
      setImagePreviews(response.data.data.sections.map((section: HistorySection) => section.image || null));
      setSelectedFiles(response.data.data.sections.map(() => null));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save history data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineImage className="mr-2 text-blue-600" />
            {historyData ? "Edit History Section" : "Create History Section"}
          </h2>
          <button
            onClick={() => navigate("/admin/cms/aboutUs")}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* History Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              History Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label name="title" label="Title" />
                <InputField
                  name="title"
                  type="text"
                  placeholder="Enter title (e.g., Our History)"
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label name="mainDescription" label="Main Description" />
                <textarea
                  id="mainDescription"
                  placeholder="Enter main description"
                  {...register("mainDescription", { required: "Main description is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                />
                {errors.mainDescription && <p className="text-red-500 text-sm mt-1">{errors.mainDescription.message}</p>}
              </div>
            </div>
          </div>

          {/* Sections */}
          {fields.map((field, index) => (
            <div key={field.id} className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b-2 border-[#019cec] pb-2">
                  Section {index + 1}
                </h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                      removeImage(index);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label name={`sections.${index}.heading`} label="Section Heading" />
                  <InputField
                    name={`sections.${index}.heading`}
                    type="text"
                    placeholder="Enter section heading"
                    register={register}
                    required="Section heading is required"
                    className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                  />
                  {errors.sections?.[index]?.heading && (
                    <p className="text-red-500 text-sm mt-1">{errors.sections[index]?.heading?.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label name={`sections.${index}.description`} label="Section Description" />
                  <textarea
                    id={`sections.${index}.description`}
                    placeholder="Enter section description"
                    {...register(`sections.${index}.description`, { required: "Section description is required" })}
                    className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                  />
                  {errors.sections?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.sections[index]?.description?.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label name={`sections.${index}.image`} label="Section Image (Optional)" />
                  <input
                    type="file"
                    accept="image/*"
                    {...register(`sections.${index}.image`)}
                    onChange={(e) => handleFileChange(index, e)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#019cec] file:text-white hover:file:bg-[#017a9b] cursor-pointer"
                  />
                  {imagePreviews[index] && (
                    <div className="mt-4 relative inline-block">
                      <img
                        src={imagePreviews[index]!}
                        alt={`Section ${index + 1} Preview`}
                        className="w-48 h-32 object-cover rounded-md border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600/80 text-white text-xs px-2 py-1 rounded hover:bg-red-700/90 shadow"
                        aria-label="Remove image"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Section Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => {
                append({ heading: "", description: "" });
                setImagePreviews([...imagePreviews, null]);
                setSelectedFiles([...selectedFiles, null]);
              }}
              className={`flex items-center px-4 py-2 rounded-md font-poppins transition-colors ${
                fields.length >= 2
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#019cec] text-white hover:bg-[#017a9b]"
              }`}
              disabled={fields.length >= 2}
            >
              <FaPlus className="mr-2" /> Add Section
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cms/aboutUs")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {historyData ? "Update History Section" : "Create History Section"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default HistoryForm;
