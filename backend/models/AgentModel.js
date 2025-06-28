import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
    },
    region: {
      type: String,
    },
    languages: [
      {
        type: String,
      },
    ],
    servicesOffered: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    commissionRate: {
      type: Number, // in percentage maybe?
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);
