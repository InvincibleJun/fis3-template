'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		let start = +new Date();
		await this.ctx.render('h5/index.html');
		let end = +new Date();
		this.ctx.logger.info(`page: h5/index, time:${end - start}`);
	}

	async notFound() {
		await this.ctx.render('h5/404.html');
	}

	async serverError() {
		await this.ctx.render('h5/500.html');
	}
}

module.exports = HomeController;
