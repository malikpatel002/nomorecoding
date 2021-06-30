import mongoose from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

const businessSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  name: {
    type: String,
  },

  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.businesse ||
  mongoose.model("businesse", businessSchema);
