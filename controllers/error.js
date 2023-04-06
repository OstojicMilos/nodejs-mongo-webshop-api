exports.get404 = (_, res) => {
  res.status(404).json({ message: "resource not found"})
};
