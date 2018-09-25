const config = require('./config/mock');
const lib = require('./config/lib');
const pxtoviewport = require('postcss-px-to-viewport');

fis.config.set('modules.parser.sass', 'node-sass');
fis.config.set('modules.parser.scss', 'node-sass');

fis.config.set('roadmap.ext.sass', 'css');
fis.config.set('roadmap.ext.scss', 'css');

fis.set('project.fileType.text', 'es');

// 忽略模板
fis.set('project.ignore', [
	'config/*',
	'mock/*',
	'fis-conf.js',
	'template/h5/common/*.html',
	'template/web/common/*.html'
]);

const isDev = process.env.NODE_ENV !== 'prod';

const ejsOptions = {
	debugger: isDev
};

/**
 * ejs处理
 * dev模式注入mock变量，prod原样输出
 */
Object.keys(config).forEach(key => {
	let val = config[key];

	fis.media('dev').match(key + '.html', {
		parser: fis.plugin('ejs', {
			data: val.data,
			options: ejsOptions
		}),
		rExt: '.html'
	});

	fis.media('prod').match(key + '.html', {
		parser: fis.plugin('html-ejs', {
			raw: true
		})
	});
});

/**
 * css/css处理
 * vm转化，css合并,css-sprite处理
 */
const cssOptions = {
	useSprite: true,
	useHash: true,
	postprocessor: fis.plugin('postcss', {
		plugins: [
			pxtoviewport({
				// 375px = 100vw
				viewportWidth: 375,
				viewportUnit: 'vw',
				fontViewportUnit: 'vmin',
				selectorBlackList: ['vw-ignore'],
				mediaQuery: false
			})
		]
	}),
	optimizer: fis.plugin('clean-css')
};

fis
	.match('::package', {
		spriter: fis.plugin('csssprites')
	})
	.match('**.scss', {
		parser: fis.plugin('node-sass'),
		rExt: '.css',
		...cssOptions
	})
	.match('*.css', cssOptions);

// 所有图片加 hash
fis.match('image', {
	useHash: true
});

/**
 * js处理
 * 兼容es6语法（不适用es6模块规范）
 */
fis.match('**.js', {
	parser: fis.plugin('babel-6.x', {
		presets: ['env', 'stage-2']
	}),
	useHash: true,
	rExt: 'js'
});

/**
 * 模块定义
 * lib文件必须使用commonjs规范，否则通过isMod定义为commonjs规范。
 */
Object.keys(lib).forEach(key => {
	const val = lib[key];
	const { version, alias, isMod, filename } = val;

	if (!version) {
		throw new Error(key + ' not match version');
	}
	if (!filename) {
		throw new Error(key + ' not match filename');
	}

	fis.hook('commonjs', {
		paths: {
			[alias || key]: 'static/lib/js/' + filename + '?v=' + version
		}
	});

	if (!isMod) {
		fis.match('static/lib/js/' + filename, {
			isMod: true
		});
	}
});

fis.match('::package', {
	postpackager: fis.plugin('loader', {
		allInOne: true, //js&css打包成一个文件
		sourceMap: true, //是否生成依赖map文件
		useInlineMap: true //是否将sourcemap作为内嵌脚本输出
	})
});

fis.match('::package', {
	spriter: fis.plugin('csssprites')
});
