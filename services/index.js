// Import all the users models
const db = require('../models/index');

// Import all the service constructors
const FavoriteService = require('./FavoriteService');

// Create the service objects with dependencies
const favoriteService = new FavoriteService({
	db: {
		Favorite: db.Favorite,
	},
	services: {},
});

// Export the service object
module.exports = {
	favoriteService,
};
