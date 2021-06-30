import likesModel from "../../models/postModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const id = req.body.userId;

    let user = await likesModel.find({ userId: id }).count();

    if (user)
      res.status(200).json({
        Success: true,
        liked: user,
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
