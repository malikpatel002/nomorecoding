import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export default mongoose.models.likes || mongoose.model("likes", likesSchema);
