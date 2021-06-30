import User from "../../models/userModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    let user = await User.find({}).select({
      username: 1,
      email: 1,
      fullName: 1,
      IsVerified: 1,
      fromInvitecode: 1,
      myInviteCode: 1,
      dateAdded: 1,
    });

    if (user) res.status(200).send({ Success: true, userList: user });
    else
      res
        .status(200)
        .send({ Success: false, error: "User/Password is not matching...." });
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "User/Password is not matching!!" });
  }
});

export default (req, res) => handler.run(req, res);
