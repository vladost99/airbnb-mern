const bookingService = require("../services/booking.service");

const create = async (req, res) => {
  const booking = await bookingService.create(req.body, req.user._id);
  res.json(booking);
};

const getMyList = async (req, res) => {
  const bookings = await bookingService.getListByParam({ user: req.user._id });
  res.json(bookings);
};

const getById = async (req, res) => {
  const booking = await bookingService.getById(req.params.id);

  res.json(booking);
};

module.exports = {
  create,
  getMyList,
  getById,
};
