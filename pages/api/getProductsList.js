import { ObjectId } from "bson";
import productsModel from "../../models/productsModel";
import createHandler from "../../Mongoose/createHandler";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (req.body.get) {
      let user;
      if (req.body.editId) {
        user = await productsModel.find({ _id: req.body.editId });
      } else {
        user = await productsModel.find({ detail: "cc" });
      }

      if (user) res.status(200).json({ Success: true, productsList: user });
      else
        res
          .status(200)
          .send({ Success: false, error: "Not able to load data" });
    } else {
      const name = req.body.productName;
      const detail = req.body.productDetail;
      const isActive = req.body.isActive;
      const categoryId = req.body.categoryId;
      const businessid = req.body.businessesId;
      const imagepath = req.body.productImageURL;
      const dateAdded = new Date().toUTCString();

      if (req.body.addOrEdit) {
        let user = await productsModel.find({ name: name });

        if (user.length == 0) {
          const newUser = await new productsModel({
            isActive,
            name,
            detail,
            categoryId,
            businessid,
            imagepath,
            dateAdded,
          }).save();

          if (newUser)
            res.status(200).json({
              Success: true,
              productsList: newUser,
            });
          else
            res
              .status(200)
              .send({ Success: false, error: "Not able to insert data" });
        } else
          res
            .status(200)
            .send({ Success: false, error: "Product is already Available" });
      } else {
        const id = req.body.productId;
        let user = await productsModel.find({ name: name, _id: { $ne: id } });
        if (user.length != 0)
          res.status(200).send({
            Success: false,
            error: "Product is already Available!!!",
          });
        else {
          user = await productsModel.findOneAndUpdate(
            { _id: id },
            {
              isActive,
              name,
              detail,
              categoryId,
              businessid,
              imagepath,
            }
          );

          if (user) res.status(200).json({ Success: true, productList: user });
          else
            res.status(200).send({
              Success: false,
              error: "Not able to Update data",
              cat: user,
            });
        }
      }
    }
  } catch (e) {
    res
      .status(400)
      .send({ Success: false, error: "Not able to connect Database!!" });
  }
});

export default (req, res) => handler.run(req, res);
