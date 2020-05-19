const fetch = require('node-fetch');
const Logger = require('../loaders/logger');

class FavoriteService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getProduct(idProduct) {
		let product;
		await fetch(`http://localhost:4000/api/courses/${idProduct}`)
			.then((response) => response.json())
			.then(async function (data) {
				product = data.data[0];
			})
			.catch((err) => {
				Logger.error(err);
			});
		return product;
	}

	async deleteFromFavoriteList(payload, idProduct) {
		let storedItem;
		const { userId } = payload;
		const userExists = await this.db.Favorite.findOne({
			userId,
		});

		if (userExists) {
			storedItem = userExists.items.find(function (elem) {
				return elem.id == idProduct;
			});
			if (storedItem) {
				userExists.items.splice(
					userExists.items.indexOf(storedItem._id),
					1,
				);
				userExists.save();
				console.log(userExists);
				return { success: true, data: { userExists } };
			}
			return {
				success: false,
				mesaj: 'Produsul nu exista in lista de favorite',
			};
		}
		return {
			success: false,
			mesaj: 'Utilizatorul nu exista',
		};
	}

	async deleteAllFromFavoriteList(idUser) {
		try {
			const cart = await this.db.Favorite.deleteOne({
				userId: idUser,
			});

			return { success: true, data: { cart } };
		} catch (error) {
			Logger.error(error);
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async addInFavoriteList(payload, idProduct) {
		let storedItem;
		const { userId } = payload;
		const items = [];
		const list = {
			userId,
			items,
		};

		const storedProduct = await this.getProduct(idProduct);

		try {
			if (storedProduct) {
				const userExists = await this.db.Favorite.findOne({
					userId,
				});
				if (userExists) {
					storedItem = userExists.items.find(function (
						elem,
					) {
						return elem.id == storedProduct._id;
					});
					if (!storedItem) {
						storedItem = {
							id: storedProduct._id,
							item: {
								name: storedProduct.name,
								image: storedProduct.image,
								price: storedProduct.price,
							},
						};
						userExists.items.push(storedItem);
						userExists.save();
						return {
							success: true,
							data: { userExists },
						};
					}
					return {
						success: false,
						data: {
							mesaj:
								'Produsul exista deja in lista de favorite.',
							userExists,
						},
					};
				}
				storedItem = {
					id: storedProduct._id,
					item: {
						name: storedProduct.name,
						image: storedProduct.image,
						price: storedProduct.price,
					},
				};
				list.items.push(storedItem);
				const favorites = new this.db.Favorite(list);
				favorites.save();
				return { success: true, data: { favorites } };
			}
			return {
				success: false,
				mesaj: 'Produsul nu exista in baza de date',
			};
		} catch (error) {
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async getAllFavoriteProducts() {
		try {
			const favorites = await this.db.Favorite.find({});

			return { success: true, data: { favorites } };
		} catch (error) {
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async getFavoriteProducts(idUser) {
		try {
			const favorites = await this.db.Favorite.find({
				userId: idUser,
			});

			return { success: true, data: { favorites } };
		} catch (error) {
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}

	async deleteAll() {
		try {
			const favorites = await this.db.Favorite.deleteMany({});

			return { success: true, data: { favorites } };
		} catch (error) {
			Logger.error(error);
			return {
				success: false,
				error: { message: error.message },
			};
		}
	}
}

module.exports = FavoriteService;
