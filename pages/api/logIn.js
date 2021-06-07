import User from "../../models/userModel";
import createHandler from "../../Mongoose/createHandler";
const jwt = require("jsonwebtoken");
const jwtSecret = "SUPERSECRETE20220";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email, password });

    // const user = await new User().find({ email, password }).exec();

    const token = jwt.sign(
      { userId: user._id, email: user.email, userName: user.userName },
      jwtSecret,
      {
        expiresIn: 30000, //50 minutes
      }
    );
    if (user) res.status(200).send({ Success: true, token: token });
    else
      res
        .status(200)
        .send({ Success: false, error: "User/Password is not matching" });
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "User/Password is not matching!!" });
  }

  // saved!
});

export default (req, res) => handler.run(req, res);
