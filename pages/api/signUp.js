import User from "../../models/userModel";
import createHandler from "../../Mongoose/createHandler";
const jwt = require("jsonwebtoken");
const jwtSecret = "SUPERSECRETE20220";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.email + "---user";

    const newUser = await new User({ email, password, userName }).save();
    //   newUser.save() ;
    // const user = creationResult.ops[0];
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
      {
        expiresIn: 3000, //50 minutes
      }
    );
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ Success: false, error: null });
  }

  // saved!
});

//   User.insertOne(
//     {
//       email,
//       password,
//       userName,
//     },
//     function (err, userCreated) {
//       if (userCreated.ops.length === 1) {
//         const user = creationResult.ops[0];
//         const token = jwt.sign(
//           { userId: user.userId, email: user.email },
//           jwtSecret,
//           {
//             expiresIn: 3000, //50 minutes
//           }
//         );
//         res.status(200).json({ token });
//         return;
//     }
// //   );
// });

export default (req, res) => handler.run(req, res);