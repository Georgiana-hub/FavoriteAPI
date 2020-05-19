const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	items: [
		{
			id: {
				type: mongoose.Types.ObjectId,
				required: true,
			},
			item: {
				name: { type: String, required: true },
				image: { type: String, required: false },
				price: { type: Number, required: true },
			},
		},
	],
});

module.exports = favoriteSchema;
