import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  imagepath: {
    type: String,
  },
  avgrating: {
    type: Number,
  },
  detail: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  businessid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businesses",
  },
  imagepath: { type: String },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.product ||
  mongoose.model("product", productsSchema);
