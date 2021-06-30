import followersModel from "../../models/followersModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const id = req.body.userId;
    let follower = await followersModel.find({ followerId: id }).count();
    let user = await followersModel.find({ userId: id }).count();

    if (user && follower)
      res.status(200).json({
        Success: true,
        follower: follower,
        followed: user,
      });
    else
      res
        .status(200)
        .send({ Success: false, error: "Not able to insert data" });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect Database!!" });
  }
});

export default (req, res) => handler.run(req, res);
