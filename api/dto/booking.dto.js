const Joi = require("joi");

const createBookingSchema = Joi.object({
  checkIn: Joi.string().required(),
  checkOut: Joi.string().required(),
  place: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  numberOfGuests: Joi.number().required(),
  price: Joi.number().required(),
});

module.exports = {
  createBookingSchema,
};
