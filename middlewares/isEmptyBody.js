exports.isEmptyBody = async (req, res, next) => {
  const body = JSON.stringify(req.body);

  if (body === "{}") {
    return res.status(400).json({ message: "missing fields" });
  }

  next();
};
