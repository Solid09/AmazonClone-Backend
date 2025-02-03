const router = require("express").Router();
const Product = require("../../models/product.js");
const { verifyToken } = require("../../middleware/auth.js");

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.get("/:category", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (!products)
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });

    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.post(
  "/",
  verifyToken,
 
  async (req, res) => {
    try {
      const product = new Product(req.body);
      if (!product)
        return res.status(400).json({ success: false, message: "No data!" });
      product.image = req.file.buffer;

      await product.save();

      return res.status(201).json({ success: true, product });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong, please try again later",
        error: err.message,
      });
    }
  }
);

router.patch(
  "/:id",
  verifyToken,
 
  async (req, res) => {
    try {
      const product = new Product(req.body);
      if (!product)
        return res.status(400).json({ success: false, message: "No data!" });
      product.image = req.file.buffer;

      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        product,
        { new: true }
      );

      if (!updatedProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      return res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong, please try again later",
        error: err.message,
      });
    }
  }
);

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

module.exports = router;
