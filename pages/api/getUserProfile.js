import UserProfileModel from "../../models/UserProfileModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const _id = req.body.userId;

    const user = await UserProfileModel.find({ _id: _id, IsActive: true });
    if (user) {
      res.status(200).send({ Success: true, userInfo: user });
    } else {
      res.status(200).send({
        Success: false,
        error:
          "There are no data available for this user or user is not Active!!!",
      });
    }
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect Database!!" });
  }
});

export default (req, res) => handler.run(req, res);
