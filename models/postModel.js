import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  dateAdded: {
    type: Date,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});

export default mongoose.models.post || mongoose.model("post", postSchema);
