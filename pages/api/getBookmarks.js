import bookmarksModel from "../../models/bookmarksModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    // if (req.body.get) {
    const id = req.body.userId;
    let user = await bookmarksModel
      .find({ userid: id, isActive: true })
      .count();

    if (user) res.status(200).json({ Success: true, bookmarks: user });
    else
      res.status(200).send({ Success: false, error: "Not able to load data" });
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect Database!!" });
  }
});

export default (req, res) => handler.run(req, res);
