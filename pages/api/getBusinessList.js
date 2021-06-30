import businessesModel from "../../models/businessModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    // if (req.body.get) {
    let user = await businessesModel.find();

    if (user) res.status(200).json({ Success: true, businessList: user });
    else
      res.status(200).send({ Success: false, error: "Not able to load data" });
    // } else {
    //   if (req.body.addOrEdit) {
    //     const name = req.body.categoryName;
    //     const icon = req.body.categoryIcon;
    //     const isActive = req.body.isActive;

    //     let user = await CategoryModel.find({ name: name });

    //     if (user.length == 0) {
    //       const newUser = await new CategoryModel({
    //         isActive,
    //         name,
    //         icon,
    //       }).save();

    //       if (newUser)
    //         res.status(200).json({ Success: true, categoryList: newUser });
    //       else
    //         res
    //           .status(200)
    //           .send({ Success: false, error: "Not able to insert data" });
    //     } else
    //       res.status(200).send({ Success: false, error: "already Available" });
    //   } else {
    //     const id = req.body.categoryId;
    //     const name = req.body.categoryName;
    //     const icon = req.body.categoryIcon;
    //     const isActive = req.body.isActive;

    //     let user = await CategoryModel.find({ name: name, _id: { $ne: id } });
    //     if (user.length != 0)
    //       res.status(200).send({
    //         Success: false,
    //         error: "Category is already Available!!!",
    //       });
    //     else {
    //       user = await CategoryModel.findOneAndUpdate(
    //         { _id: id },
    //         { name, icon, isActive }
    //       );

    //       if (user) res.status(200).json({ Success: true, categoryList: user });
    //       else
    //         res.status(200).send({
    //           Success: false,
    //           error: "Not able to Update data",
    //           cat: user,
    //         });
    //     }
    //   }
    // }
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect Database!!" });
  }
});

export default (req, res) => handler.run(req, res);
