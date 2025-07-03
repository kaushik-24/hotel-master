import mongoose, { Schema } from "mongoose";

export interface IHistorySection {
  heading: string;
  description: string;
  image?: string;
}

export interface IHistory {
  title: string;
  mainDescription: string;
  sections: IHistorySection[];
}

const historySectionSchema = new Schema<IHistorySection>(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

const historySchema = new Schema<IHistory>(
  {
    title: {
      type: String,
      required: true,
    },
    mainDescription: {
      type: String,
      required: true,
    },
    sections: {
      type: [historySectionSchema],
      required: true,
      validate: {
        validator: (sections: IHistorySection[]) => sections.length >= 1 && sections.length <= 2,
        message: "History must have 1 to 2 sections",
      },
    },
  },
  { timestamps: true }
);

const History = mongoose.model<IHistory>("History", historySchema);

export default History;
