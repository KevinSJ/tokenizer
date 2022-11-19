const validateBody = (req, res, next) => {
  if (typeof req.body === "undefined" || !Array.isArray(req.body)) {
    return res.status(400).send("Request body can not be empty");
  }
  next();
};

export { validateBody };
