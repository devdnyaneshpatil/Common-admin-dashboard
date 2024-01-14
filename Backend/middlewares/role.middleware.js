const authorize = (permittedRole) => {
  return (req, res, next) => {
    if (permittedRole.includes(req.role)) {
      next();
    } else {
      res.status(200).json({ msg: "Not authorized" });
    }
  };
};

module.exports = authorize;
