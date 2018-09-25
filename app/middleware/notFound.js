'use strict';

module.exports = () => {
	return async function notFound(ctx, next) {
		await next();
		if (ctx.status !== 404 || ctx.body) {
			return;
		}

		// 无返回值
		ctx.status = 404;

		if (ctx.acceptJSON) {
			ctx.body = {
				code: 404,
				message: '未找到页面'
			};
		}

		ctx.redirect('/404');
	};
};
