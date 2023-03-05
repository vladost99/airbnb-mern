const bookingModel = require("../models/booking.model");
const asyncHandler = require("../utils/async-handler.utils");

const create = asyncHandler(
  async (
    { place, checkIn, checkOut, numberOfGuests, name, phone, price },
    userId
  ) => {
    return await bookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userId,
    });
  }
);

const getListByParam = asyncHandler(async (findObj = {}) => {
  return await bookingModel.find(findObj).populate("place");
});

const getById = asyncHandler(async (id) => {
  return await bookingModel.findById(id).populate("place");
});

module.exports = {
  create,
  getListByParam,
  getById,
};
