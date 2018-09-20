const { mock } = require('mockjs');

module.exports = {
	Index: mock({
		'android|40-100': '★',
		'ios|40-100': '★'
	}),
	app: {
		a: '11'
	}
};
