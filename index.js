const express = require("express");
const helmet = require("helmet");
const routes = require("./routes");
const reqRateLimiter = require("./middleware/reqRateLimit.js");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} from origin: ${req.headers.origin}`);
  next();
});

const allowedOrigins = {
  origin: "https://amazonclone99999.netlify.app",
  credentials: true,
};

app.set('trust proxy', 1); // Trust the first proxy (Heroku's proxy)
app.use(express.json());
app.use(helmet());
app.use(cors(allowedOrigins));
app.options('*', cors());
app.use(cookieParser());
app.use(reqRateLimiter);
app.use('/uploads', express.static('uploads'));
app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.log("Error connecting to MongoDB!", err);
    process.exit(1);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running on port");
});
