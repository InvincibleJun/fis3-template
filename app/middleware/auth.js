'use strict';

module.exports = () => {
	return async function auth(ctx, next) {
		await next();
		// console.log('check');
		// const res = await ctx.curl('/checkedLoad', {
		// 	method: 'get',
		// 	data: {
		// 		uid: 'xxx',
		// 		token: 'xxxxx'
		// 	},
		// 	timeout: 15000
		// });

		let res = {
			loaded: false
		};

		if (!res.loaded) {
			ctx.redirect('/404');
		}
	};
};
