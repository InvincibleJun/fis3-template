const config = require('./config/mock');

fis.config.set('modules.parser.sass', 'node-sass');
fis.config.set('modules.parser.scss', 'node-sass');

fis.config.set('roadmap.ext.sass', 'css');
fis.config.set('roadmap.ext.scss', 'css');

const ejsOptions = {};

// 忽略模板
fis.set('project.ignore', [
	'config/*',
	'mock/*',
	'fis-conf.js',
	'template/h5/common/*.html',
	'template/web/common/*.html'
]);

const isDev = process.env.NODE_ENV !== 'prod';

const dev = fis.media('dev');
const prod = fis.media('prod');

Object.keys(config).forEach(key => {
	let val = config[key];
	dev.match(key + '.html', {
		parser: fis.plugin('ejs', {
			data: val.data,
			options: ejsOptions
		}),
		rExt: '.html'
	});

	prod.match(key + '.html', {
		parser: fis.plugin('html-ejs', {
			raw: true
		})
	});
});

fis.match('**.scss', {
	parser: fis.plugin('node-sass'),
	useHash: true,
	rExt: '.css'
});

fis.match('**.css', {
	useHash: true,
	optimizer: fis.plugin('clean-css')
});

fis.hook('module', {
	wrop: '',
	mode: 'amd',
	paths: {
		jquery: '/static/libs/js/jquery'
	}
});

// fis.match('**.png', {

// })