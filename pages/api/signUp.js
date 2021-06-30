import User from "../../models/userModel";
import createHandler from "../../Mongoose/createHandler";
const jwt = require("jsonwebtoken");
const jwtSecret = "SUPERSECRETE20220";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userName = "";

    let user = await User.findOne({ email });

    if (!user) {
      const newUser = await new User({ email, password, userName }).save();
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        jwtSecret,
        {
          expiresIn: 3000, //50 minutes
        }
      );
      res.status(200).json({ Success: true, token: token });
    } else {
      res.status(400).json({ Success: false, error: "Email already Exists" });
    }
  } catch (e) {
    res.status(400).json({ Success: false, error: null });
  }

  // saved!
});

export default (req, res) => handler.run(req, res);
