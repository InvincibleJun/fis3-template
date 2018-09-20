'use strict';

module.exports = () => {
	return async function auth(ctx) {
		const res = await ctx.curl('/checkedLoad', {
			method: 'get',
			data: {
				uid: 'xxx',
				token: 'xxxxx'
			},
			timeout: 15000
		});

		if (!res.loaded) {
			ctx.redirect('/404');
		}
	};
};
