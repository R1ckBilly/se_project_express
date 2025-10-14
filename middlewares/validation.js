const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Name must be at least 2 characters',
      "string.max": 'Name must be at most 30 characters',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'Avatar URL is required',
      "string.uri": 'Avatar must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'Email is required',
      "string.email": 'Email must be valid',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'Password is required',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'Email is required',
      "string.email": 'Email must be valid',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'Password is required',
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'Name must be at least 2 characters',
      "string.max": 'Name must be at most 30 characters',
      "any.required": 'Name is required',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'Avatar URL is required',
      "string.uri": 'Avatar must be a valid URL',
      "any.required": 'Avatar is required',
    }),
  }),
});

const validateItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'Item name must be at least 2 characters',
      "string.max": 'Item name must be at most 30 characters',
      "string.empty": 'Item name is required',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'Image URL is required',
      "string.uri": 'Image URL must be a valid URL',
    }),
     weather: Joi.string().optional().messages({
      "string.base": "Weather must be a string",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required().messages({
      "string.length": 'ID must be 24 characters',
      "string.hex": 'ID must be hexadecimal',
      "any.required": 'ID is required',
    }),
  }),
});

module.exports = {
  validator,
  validateURL,
  validateUserBody,
  validateLogin,
  validateUserUpdate,
  validateItemBody,
  validateId,
}