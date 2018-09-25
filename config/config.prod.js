const path = require('path');

module.exports = appInfo => {
	return {
		onerror: {
			errorPageUrl: '/500'
		},
		view: {
			mapping: {
				'.html': 'ejs'
			},
			root: path.join(appInfo.baseDir, './views')
		}
	};
};
