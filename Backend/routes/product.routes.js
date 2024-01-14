const express = require("express");
const ProductModel = require("../models/product.model");

const productRouter = express.Router();

//routes for user and admin.

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

productRouter.get("/filter", async (req, res) => {
  const category = req.query.category;
  try {
    const products = await ProductModel.find({ category: category });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

productRouter.get("/sort", async (req, res) => {
  const order = req.query.order;
  try {
    if (order == "asc") {
      const products = await ProductModel.find().sort({ price: 1 });
      res.status(200).json({ data: products });
    } else if (order == "desc") {
      const products = await ProductModel.find().sort({ price: -1 });
      res.status(200).json({ data: products });
    } else {
      const products = await ProductModel.find();
      res.status(200).json({ data: products });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

productRouter.get("/cart",async(req,res)=>{
  try {
    const products = await ProductModel.find({isInCart:true});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})

// routes only for admin.

productRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.status(200).json({ msg: "Product Has Been Added" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

productRouter.patch("/update/:id", async (req, res) => {
  const productId = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: productId }, payload);
    res.status(200).json({ msg: "Product Has Been Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

productRouter.delete("/delete/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: productId });
    res.status(200).json({ msg: "Product Has Been Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = productRouter;
