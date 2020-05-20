const fetch = require('node-fetch');
const Logger = require('../loaders/logger');

class FavoriteService {
	constructor({ db, services }) {
		this.db = db;
		this.services = services;
	}

	async getProduct(idProduct) {
		let product;
		await fetch(
			`https://ip-accounts.herokuapp.com/api/courses/${idProduct}`,
		)
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
		const { token } = payload;
		let tokenIdUser;
		let okToken = true;
		if (payload.token) {
			const bearer = `Bearer ${token}`;
			await fetch(
				'https://ip-accounts.herokuapp.com/api/users/auth',
				{
					method: 'GET',
					headers: {
						Authorization: bearer,
					},
				},
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					if (response.success) {
						tokenIdUser = response.data.user[0]._id;
					} else {
						okToken = false;
					}
				})
				.catch((error) => {
					Logger.error(error);
				});
		} else {
			okToken = false;
		}

		if (!okToken) {
			return {
				success: false,
				error: { message: 'User is not logged.' },
			};
		}

		const userExists = await this.db.Favorite.findOne({
			userId: tokenIdUser,
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
				return { success: true, data: { userExists } };
			}
			return {
				success: false,
				error: {
					message:
						'Product does not exist in favorites list.',
				},
			};
		}
		return {
			success: false,
			error: { message: 'User does not exist.' },
		};
	}

	async deleteAllFromFavoriteList(token) {
		let tokenIdUser;
		let okToken = true;
		if (token) {
			const bearer = `Bearer ${token}`;
			await fetch(
				'https://ip-accounts.herokuapp.com/api/users/auth',
				{
					method: 'GET',
					headers: {
						Authorization: bearer,
					},
				},
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					if (response.success) {
						tokenIdUser = response.data.user[0]._id;
					} else {
						okToken = false;
					}
				})
				.catch((error) => {
					Logger.error(error);
				});
		} else {
			okToken = false;
		}

		try {
			if (!okToken) {
				throw new Error('The user is not logged in.');
			}

			const cart = await this.db.Favorite.deleteOne({
				userId: tokenIdUser,
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
		const { token } = payload;
		let tokenIdUser;
		let okToken = true;
		if (payload.token) {
			const bearer = `Bearer ${token}`;
			await fetch(
				'https://ip-accounts.herokuapp.com/api/users/auth',
				{
					method: 'GET',
					headers: {
						Authorization: bearer,
					},
				},
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					if (response.success) {
						tokenIdUser = response.data.user[0]._id;
					} else {
						okToken = false;
					}
				})
				.catch((error) => {
					Logger.error(error);
				});
		} else {
			okToken = false;
		}

		const items = [];
		const list = {
			userId: tokenIdUser,
			items,
		};

		const storedProduct = await this.getProduct(idProduct);

		try {
			if (!okToken) {
				throw new Error('The user is not logged in.');
			}
			if (storedProduct) {
				const userExists = await this.db.Favorite.findOne({
					userId: tokenIdUser,
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
				console.log(list);
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

	async getFavoriteProducts(token) {
		let tokenIdUser;
		let okToken = true;
		if (token) {
			const bearer = `Bearer ${token}`;
			await fetch(
				'https://ip-accounts.herokuapp.com/api/users/auth',
				{
					method: 'GET',
					headers: {
						Authorization: bearer,
					},
				},
			)
				.then((res) => {
					return res.json();
				})
				.then((response) => {
					if (response.success) {
						tokenIdUser = response.data.user[0]._id;
					} else {
						okToken = false;
					}
				})
				.catch((error) => {
					Logger.error(error);
				});
		} else {
			okToken = false;
		}

		try {
			if (!okToken) {
				throw new Error('The user is not logged in.');
			}

			const favorites = await this.db.Favorite.find({
				userId: tokenIdUser,
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
