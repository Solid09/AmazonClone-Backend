const role = (givenRole) => {
  return (req, res, next) => {
    if (req.user.role === givenRole) {
      next();
    } else {
      res.status(403).send("You are not allowed to access this route");
    }
  };
};

module.exports = role;