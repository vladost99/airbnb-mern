const Joi = require("joi");

const createPlaceSchema = Joi.object({
  title: Joi.string().min(5).message("Min 5 charachers in title").required(),
  address: Joi.string()
    .min(5)
    .message("Min 5 charachers in address")
    .required(),
  photos: Joi.array().required(),
  description: Joi.string()
    .min(5)
    .message("Min 5 charachers in description")
    .required(),
  perks: Joi.array().required(),
  extraInfo: Joi.string().min(5).message("Min 5 charachers in extraInfo"),
  checkIn: Joi.number().required(),
  checkOut: Joi.number().required(),
  maxGuests: Joi.number().required(),
  price: Joi.number().required(),
});

const updatePlaceSchema = Joi.object({
  title: Joi.string().min(5).message("Min 5 charachers in title").required(),
  address: Joi.string()
    .min(5)
    .message("Min 5 charachers in address")
    .required(),
  photos: Joi.array().required(),
  description: Joi.string()
    .min(5)
    .message("Min 5 charachers in description")
    .required(),
  perks: Joi.array().required(),
  extraInfo: Joi.string().min(5).message("Min 5 charachers in extraInfo"),
  checkIn: Joi.number().required(),
  checkOut: Joi.number().required(),
  maxGuests: Joi.number().required(),
  price: Joi.number().required(),
});

const uploadByLinkSchema = Joi.object({
  link: Joi.string()
    .pattern(
      /^(https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    )
    .message("Link is no correct https"),
});

module.exports = {
  createPlaceSchema,
  updatePlaceSchema,
  uploadByLinkSchema,
};
