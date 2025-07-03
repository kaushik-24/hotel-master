import mongoose, { Schema } from "mongoose";

export interface ISection {
  topic: string;
  description: string;
}

export interface IQuestAndValues {
  questAndVision: {
    title: string;
    mainDescription: string;
    sections: ISection[];
  };
  coreValues: {
    title: string;
    mainDescription: string;
    sections: ISection[];
  };
}

const sectionSchema = new Schema<ISection>(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const questAndValuesSchema = new Schema<IQuestAndValues>(
  {
    questAndVision: {
      title: { type: String, required: true, default: "Our Quest & Vision" },
      mainDescription: { type: String, required: true, default: "Offering rest, recovery, and introspection with outstanding hospitality." },
      sections: {
        type: [sectionSchema],
        required: true,
        validate: {
          validator: (sections: ISection[]) => sections.length >= 1 && sections.length <= 2,
          message: "Quest and Vision must have 1 to 2 sections",
        },
      },
    },
    coreValues: {
      title: { type: String, required: true, default: "Core Values" },
      mainDescription: { type: String, required: true, default: "Below are its core values that serve as the pillars of its identity." },
      sections: {
        type: [sectionSchema],
        required: true,
        validate: {
          validator: (sections: ISection[]) => sections.length >= 1 && sections.length <= 2,
          message: "Core Values must have 1 to 2 sections",
        },
      },
    },
  },
  { timestamps: true }
);

const QuestAndValues = mongoose.model<IQuestAndValues>("QuestAndValues", questAndValuesSchema);

export default QuestAndValues;
