import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.category ||
  mongoose.model("category", categorySchema);
