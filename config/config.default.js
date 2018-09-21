'use strict';
const path = require('path');

module.exports = appInfo => {
	const config = (exports = {});

	config.keys = 'd1-front';

	// use for cookie sign key, should change to your own and keep security

	// add your config here
	config.middleware = [];

	config.static = {
		prefix: '/static',
		dir: path.join(appInfo.baseDir, 'release/static'),
		dynamic: true,
		preload: false,
		maxAge: 31536000,
		buffer: false
	};

	config.view = {
		mapping: {
			'.html': 'ejs'
		},
		root: path.join(appInfo.baseDir, './release/template')
	};

	return config;
};
