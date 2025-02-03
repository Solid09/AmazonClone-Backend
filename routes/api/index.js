const router = require("express").Router();
const userRoute = require("./user.js");
const cartRoute = require("./cart.js");
const orderRoute = require("./order.js");
const authRoute = require("./auth.js");
const productRoute = require("./product.js");
const utilRoute = require("./util.js");

router.use("/user", userRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);
router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/util", utilRoute);

module.exports = router;
