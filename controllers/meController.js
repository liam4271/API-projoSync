const getMe = (req, res, next) => {
  try {
    console.log(req.user);
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe };
