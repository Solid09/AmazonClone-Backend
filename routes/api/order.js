const router = require("express").Router();
const Order = require("../../models/order.js");
const { verifyToken } = require("../../middleware/auth.js");

router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId });

    return res.status(200).json({ success: true, orders: orders });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { order } = req.body;

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "No data given!" });
    }

    const newOrder = new Order({
      cart: order.cart,
      totalAmount: order.totalAmount,
      user: req.user.userId,
    });

    await newOrder.save();

    return res.status(200).json({ success: true, message: "Order added!" });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Order.deleteOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Order deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "No data given!" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        $set: {
          cart: order.cart,
          totalAmount: order.totalAmount,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong, please try again later",
      error: err.message,
    });
  }
});

module.exports = router;
