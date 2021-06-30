import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.models.user ||
  mongoose.model("user", userProfileSchema);
