const path = require('path');

module.exports = appInfo => {
	return {
		static: {
			prefix: '/static',
			dir: path.join(appInfo.baseDir, 'release/static'),
			dynamic: true,
			preload: false,
			maxAge: 31536000,
			buffer: false
		},

		// dev模式的api转发不解析body
		bodyParser: {
			ignore: '/api'
		},

		// 只在dev模式代理
		proxy: {
			host: 'http://183.60.198.47:10088', // target host that matched path will be proxy to
			match: /\/admin\/|\/api\//
		}
	};
};
