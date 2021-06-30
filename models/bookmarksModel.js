import mongoose from "mongoose";

const bookmarksSchema = new mongoose.Schema({
  isActive: { type: Boolean },
  userId: { type: String },
  productid: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});

export default mongoose.models.bookmark ||
  mongoose.model("bookmark", bookmarksSchema);
