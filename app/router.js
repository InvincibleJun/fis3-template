'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	const auth = app.middleware.auth();

	router.get('/', controller.home.index);

	router.get('/app', auth, controller.home.index);

	router.get('/404', controller.home.notFound);

	router.get('/500', controller.home.serverError);
};
