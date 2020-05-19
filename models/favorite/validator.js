const { Joi } = require('celebrate');
// const joiObjectId = require('joi-objectid');

// // add joi-objectId to Joi
// Joi.objectId = joiObjectId(Joi);

const favoriteValidationSchema = Joi.object().keys({
	userId: Joi.string()
		.regex(/^[a-fA-F0-9]{24}$/)
		.error(new Error('User id invalid')),
});

module.exports = favoriteValidationSchema;
