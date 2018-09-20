'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		await this.ctx.render('h5/index.html', {
			ios: '1'
		});
	}

	async notFound() {
		await this.ctx.render('h5/404.html');
	}

	async serverError() {
		await this.ctx.render('h5/500.html');
	}
}

module.exports = HomeController;
