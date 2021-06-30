import mongoose from "mongoose";
import { MONGODB_URL_STRING_DEV } from "../global";

const databaseMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose) {
      global.mongoose = await mongoose.connect(MONGODB_URL_STRING_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  } catch (ex) {
    console.error(ex);
  }
  return next();
};
export default databaseMiddleware;
