import mongoose from "mongoose";
import { MONGODB_URL_STRING } from "../global";
// const MONGODB_CONN_STR =

const databaseMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose) {
      global.mongoose = await mongoose.connect(MONGODB_URL_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    }
  } catch (ex) {
    console.error(ex);
  }
  return next();
};
export default databaseMiddleware;
