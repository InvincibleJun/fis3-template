'use strict';
const path = require('path');

module.exports = appInfo => {
	const config = (exports = {});

	config.keys = 'd1-front';

	config.middleware = ['notFound'];

	config.view = {
		mapping: {
			'.html': 'ejs'
		},
		root: path.join(appInfo.baseDir, './release/template')
	};

	return config;
};
