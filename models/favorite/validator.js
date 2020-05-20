const { Joi } = require('celebrate');
// const joiObjectId = require('joi-objectid');

// // add joi-objectId to Joi
// Joi.objectId = joiObjectId(Joi);

const favoriteValidationSchema = Joi.object().keys({
	token: Joi.string().error(new Error('Token is invalid')),
});

module.exports = favoriteValidationSchema;
