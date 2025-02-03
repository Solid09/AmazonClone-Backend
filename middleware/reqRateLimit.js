const { rateLimit  } = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	limit: 100, // Limit each IP to 100 requests per `window` p/15mins
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	message:"Too many requests, please try again in a few minutes",
});

module.exports = limiter;