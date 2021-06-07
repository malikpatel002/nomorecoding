import User from "../../models/userModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const id = req.body.id;
    const callFor = req.body.callFor;

    switch (callFor) {
      case "getUserName": {
        let user = await User.findById(id);
        if (user)
          res.status(200).send({ Success: true, userName: user.userName });
        else res.status(200).send({ Success: false, error: "User Not Found" });
        break;
      }
      case "updateUserName": {
        // let user = await Person.replaceOne({ _id }, { name: 'Jean-Luc Picard' });
        let user = await User.findOneAndUpdate(
          { _id: id },
          { userName: req.body.userName }
        );
        if (user)
          res.status(200).send({ Success: true, userName: req.body.userName });
        else res.status(200).send({ Success: false, error: "User Not Found" });
        break;
      }
      case "updatePass": {
        let user = await User.findOneAndUpdate(
          { _id: id },
          { password: req.body.pass }
        );
        if (user)
          res.status(200).send({
            Success: true,
            message: "Successfully updating Password!!!",
          });
        else res.status(200).send({ Success: false, error: "User Not Found" });
        break;
      }
    }
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Unable to connect database!!" });
  }

  // saved!
});

export default (req, res) => handler.run(req, res);
