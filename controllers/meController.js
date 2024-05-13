const getMe = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe };
