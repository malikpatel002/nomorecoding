import postModel from "../../models/postModel";
import createHandler from "../../Mongoose/createHandler";
import categoryModel from "../../models/categoryModel";
import productsModel from "../../models/productsModel";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const id = req.body.userId;

    let user = await postModel
      .find({ userId: id, isActive: true })
      .limit(5)
      .sort({ dateAdded: -1 })
      .populate({
        path: "categoryId",
        model: categoryModel,
        select: { name: 1 },
      })
      .populate({
        path: "productId",
        model: productsModel,
        select: { name: 1, imagepath: 1 },
      })
      .exec();

    if (user)
      res.status(200).json({
        Success: true,
        postList: user,
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
