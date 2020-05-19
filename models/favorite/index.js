const mongoose = require('mongoose');
const favoriteSchema = require('./schema');

const statics = require('./statics');
const methods = require('./methods');
// const decorateWithHooks = require('./hooks');

Object.assign(favoriteSchema.methods, methods);
Object.assign(favoriteSchema.statics, statics);
// decorateWithHooks(reservationSchema);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
