const router = require("express").Router();
const CartItem = require("../../models/cartItem.js");
const { verifyToken } = require("../../middleware/auth.js");
const { default: mongoose } = require("mongoose");

router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("Get request made to /api/cart");

    const cart = await CartItem.find({ user: req.user.userId });

    return res.status(200).json({ success: true, cart: cart });
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
      console.log("Post request made to /api/cart");
      const { cartItem } = req.body;

      if (!cartItem) {
        return res
          .status(400)
          .json({ success: false, message: "No data given!" });
      }

      const newCartItem = new CartItem({
        name: cartItem.name,
        inStock: cartItem.inStock,
        quantity: cartItem.quantity,
        price: cartItem.price,
        isGift: cartItem.isGift,
        user: req.user.userId,
      });

      await newCartItem.save();

      return res
        .status(200)
        .json({ success: true, message: "Cart item added!", cartItem: newCartItem });
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
    console.log("Delete request made to /api/cart/:id");
    const item = await CartItem.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      user: req.user.userId,
    });
    if(item.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item deleted!",
    });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.patch(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {
      console.log("Patch request made to /api/cart/:id");
      const { cartItem } = req.body;
      if (!cartItem) {
        return res
          .status(400)
          .json({ success: false, message: "No data given!" });
      }

      const updatedCartItem = await CartItem.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.userId,
        },
        {
          $set: {
            name: cartItem.name,
            image: req.file.buffer,
            inStock: cartItem.inStock,
            quantity: cartItem.quantity,
            price: cartItem.price,
            isGift: cartItem.isGift,
            user: req.user.userId,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        cartItem: updatedCartItem,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong, please try again later",
        error: err.message,
      });
    }
  }
);

module.exports = router;
