const { Router } = require('express');
const { celebrate } = require('celebrate');
const { favoriteService } = require('../../services/index');
const { favoriteValidationSchema } = require('../../models/index');
const { statusCodes } = require('../../config/index');

const router = Router();

router.get('/', async (req, res) => {
	const result = await favoriteService.getAllFavoriteProducts();
	const statusCode = result.success
		? statusCodes.OK
		: statusCodes.BAD_REQUEST;

	res.status(statusCode).json(result);
});

router.get('/user', async (req, res) => {
	const result = await favoriteService.getFavoriteProducts(
		req.query.token,
	);
	const statusCode = result.success
		? statusCodes.OK
		: statusCodes.BAD_REQUEST;

	res.status(statusCode).json(result);
});

router.post(
	'/add-product/:idProduct',
	celebrate({ body: favoriteValidationSchema }),
	async function (req, res) {
		const result = await favoriteService.addInFavoriteList(
			req.body,
			req.params.idProduct,
		);
		const statusCode = result.success
			? statusCodes.CREATED
			: statusCodes.BAD_REQUEST;

		res.status(statusCode).json(result);
	},
);

router.delete(
	'/delete-product/:idProduct',
	celebrate({ body: favoriteValidationSchema }),
	async function (req, res) {
		const result = await favoriteService.deleteFromFavoriteList(
			req.body,
			req.params.idProduct,
		);
		const statusCode = result.success
			? statusCodes.NO_CONTENT
			: statusCodes.BAD_REQUEST;

		res.status(statusCode).json(result);
	},
);

router.delete('/user', async function (req, res) {
	const result = await favoriteService.deleteAllFromFavoriteList(
		req.query.token,
	);
	const statusCode = result.success
		? statusCodes.NO_CONTENT
		: statusCodes.BAD_REQUEST;

	res.status(statusCode).json(result);
});

router.delete('/all', async (req, res) => {
	const result = await favoriteService.deleteAll();
	const statusCode = result.success
		? statusCodes.NO_CONTENT
		: statusCodes.BAD_REQUEST;

	res.status(statusCode).json(result);
});

module.exports = router;
