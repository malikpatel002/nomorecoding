import adminModel from "../../models/adminModel";
import createHandler from "../../Mongoose/createHandler";
import userModel from "../../models/userModel";
const jwt = require("jsonwebtoken");
const jwtSecret = "SUPERSECRETE20220";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // let user = await userModel.findOne();
    let user = await adminModel.findOne({
      email,
      password,
    });

    // const user = await new User().find({ email, password }).exec();

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: 30000, //50 minutes
    });
    // res.status(200).send({ Success: true });
    if (user) res.status(200).send({ Success: true, token: token });
    else
      res
        .status(200)
        .send({ Success: false, error: "User/Password is not matching" });
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect database!!" });
  }

  // saved!
});

export default (req, res) => handler.run(req, res);
