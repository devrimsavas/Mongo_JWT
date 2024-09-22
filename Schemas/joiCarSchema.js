const Joi = require("joi");

// Define validation schema for a car
const joiCarSchema = Joi.object({
  type: Joi.string().required().messages({
    "string.empty": "Type is required.",
  }),
  HP: Joi.number().integer().min(1).required().messages({
    "number.base": "HP must be a number.",
    "number.min": "HP must be greater than 0.",
    "any.required": "HP is required.",
  }),
  HPl100: Joi.number().precision(2).min(0).required().messages({
    "number.base": "HPl100 must be a number.",
    "number.min": "HPl100 must be a positive value.",
    "any.required": "HPl100 is required.",
  }),
});

module.exports = joiCarSchema;
