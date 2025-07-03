import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

interface Section {
  topic: string;
  description: string;
}

interface QuestAndValuesData {
  questAndVision: {
    title: string;
    mainDescription: string;
    sections: Section[];
  };
  coreValues: {
    title: string;
    mainDescription: string;
    sections: Section[];
  };
}

const QuestAndValuesForm: React.FC = () => {
  const [questAndValuesData, setQuestAndValuesData] = useState<QuestAndValuesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<QuestAndValuesData>({
    defaultValues: {
      questAndVision: { title: "", mainDescription: "", sections: [{ topic: "", description: "" }] },
      coreValues: { title: "", mainDescription: "", sections: [{ topic: "", description: "" }] },
    },
  });

  const {
    fields: questFields,
    append: appendQuest,
    remove: removeQuest,
  } = useFieldArray({
    control,
    name: "questAndVision.sections",
  });

  const {
    fields: valuesFields,
    append: appendValues,
    remove: removeValues,
  } = useFieldArray({
    control,
    name: "coreValues.sections",
  });

  useEffect(() => {
    fetchQuestAndValuesData();
  }, []);

  const fetchQuestAndValuesData = async () => {
    try {
      const response = await axiosInstance.get("/api/questValues");
      const data = response.data.data;
      setQuestAndValuesData(data);
      setValue("questAndVision", data.questAndVision);
      setValue("coreValues", data.coreValues);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch Quest and Values data");
    }
  };

  const onSubmit = async (data: QuestAndValuesData) => {
    setError(null);
    try {
      const response = questAndValuesData
        ? await axiosInstance.put("/api/questValues", {
            questAndVision: data.questAndVision,
            coreValues: data.coreValues,
          })
        : await axiosInstance.post("/api/questValues", {
            questAndVision: data.questAndVision,
            coreValues: data.coreValues,
          });
      setQuestAndValuesData(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save Quest and Values data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {questAndValuesData ? "Edit Quest and Values" : "Create Quest and Values"}
          </h2>
          <button
            onClick={() => navigate("/admin/cms/aboutUs")}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Quest and Vision Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Quest and Vision
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label name="questAndVision.title" label="Title" />
                <InputField
                  name="questAndVision.title"
                  type="text"
                  placeholder="Enter title (e.g., Our Quest & Vision)"
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.questAndVision?.title && <p className="text-red-500 text-sm mt-1">{errors.questAndVision.title.message}</p>}
              </div>
              <div>
                <Label name="questAndVision.mainDescription" label="Main Description" />
                <textarea
                  id="questAndVision.mainDescription"
                  placeholder="Enter main description"
                  {...register("questAndVision.mainDescription", { required: "Main description is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                />
                {errors.questAndVision?.mainDescription && <p className="text-red-500 text-sm mt-1">{errors.questAndVision.mainDescription.message}</p>}
              </div>
            </div>
            {questFields.map((field, index) => (
              <div key={field.id} className="mt-4 p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-semibold text-gray-700">Section {index + 1}</h4>
                  {questFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuest(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label name={`questAndVision.sections.${index}.topic`} label="Section Topic" />
                    <InputField
                      name={`questAndVision.sections.${index}.topic`}
                      type="text"
                      placeholder="Enter section topic"
                      register={register}
                      required="Section topic is required"
                      className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                    />
                    {errors.questAndVision?.sections?.[index]?.topic && (
                      <p className="text-red-500 text-sm mt-1">{errors.questAndVision.sections[index]?.topic?.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label name={`questAndVision.sections.${index}.description`} label="Section Description" />
                    <textarea
                      id={`questAndVision.sections.${index}.description`}
                      placeholder="Enter section description"
                      {...register(`questAndVision.sections.${index}.description`, { required: "Section description is required" })}
                      className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                    />
                    {errors.questAndVision?.sections?.[index]?.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.questAndVision.sections[index]?.description?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => appendQuest({ topic: "", description: "" })}
                className={`flex items-center px-4 py-2 rounded-md font-poppins transition-colors ${
                  questFields.length >= 2
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#019cec] text-white hover:bg-[#017a9b]"
                }`}
                disabled={questFields.length >= 2}
                title={questFields.length >= 2 ? "Maximum of two sections allowed" : ""}
              >
                <FaPlus className="mr-2" /> Add Quest Section
              </button>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Core Values
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label name="coreValues.title" label="Title" />
                <InputField
                  name="coreValues.title"
                  type="text"
                  placeholder="Enter title (e.g., Core Values)"
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.coreValues?.title && <p className="text-red-500 text-sm mt-1">{errors.coreValues.title.message}</p>}
              </div>
              <div>
                <Label name="coreValues.mainDescription" label="Main Description" />
                <textarea
                  id="coreValues.mainDescription"
                  placeholder="Enter main description"
                  {...register("coreValues.mainDescription", { required: "Main description is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                />
                {errors.coreValues?.mainDescription && <p className="text-red-500 text-sm mt-1">{errors.coreValues.mainDescription.message}</p>}
              </div>
            </div>
            {valuesFields.map((field, index) => (
              <div key={field.id} className="mt-4 p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-semibold text-gray-700">Section {index + 1}</h4>
                  {valuesFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeValues(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label name={`coreValues.sections.${index}.topic`} label="Section Topic" />
                    <InputField
                      name={`coreValues.sections.${index}.topic`}
                      type="text"
                      placeholder="Enter section topic"
                      register={register}
                      required="Section topic is required"
                      className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                    />
                    {errors.coreValues?.sections?.[index]?.topic && (
                      <p className="text-red-500 text-sm mt-1">{errors.coreValues.sections[index]?.topic?.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label name={`coreValues.sections.${index}.description`} label="Section Description" />
                    <textarea
                      id={`coreValues.sections.${index}.description`}
                      placeholder="Enter section description"
                      {...register(`coreValues.sections.${index}.description`, { required: "Section description is required" })}
                      className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                    />
                    {errors.coreValues?.sections?.[index]?.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.coreValues.sections[index]?.description?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => appendValues({ topic: "", description: "" })}
                className={`flex items-center px-4 py-2 rounded-md font-poppins transition-colors ${
                  valuesFields.length >= 2
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#019cec] text-white hover:bg-[#017a9b]"
                }`}
                disabled={valuesFields.length >= 2}
                title={valuesFields.length >= 2 ? "Maximum of two sections allowed" : ""}
              >
                <FaPlus className="mr-2" /> Add Values Section
              </button>
            </div>
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
              {questAndValuesData ? "Update Quest and Values" : "Create Quest and Values"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default QuestAndValuesForm;
