'use strict';

const { Controller } = require('egg');
const proxy = require('koa-proxy');

class ProxyController extends Controller {
	async index() {
		await proxy({
			url: 'http://183.60.198.47:10088/admin/voice/packs?page=1',
			// useCookie
			jar: true
			// suppressRequestHeaders: ['foo', 'bar'], // case-insensitive
			// suppressResponseHeaders: ['jar-jar']
		});
	}
}

module.exports = ProxyController;
