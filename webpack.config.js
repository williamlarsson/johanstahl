var production = false,
	jquery = require('jquery'),
	webpack = require('webpack'),
	pe = require('pretty-error').start(),
	inputJs = './js/src/app.js',
    outputJs = './main.js';


module.exports = {
	debug: true,
	entry: inputJs,
	output: {
		path: __dirname,
		filename: outputJs
	},
	module:{
		loaders: [
		]
	},
	plugins: production ? [
    	new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
    	}),
    	new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false, comments: false})
  	] : [
  		new webpack.ProvidePlugin({
			"$": "jquery",
			"jQuery": "jquery",
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
    	}),
  	]
};


pe.appendStyle({
   // this is a simple selector to the element that says 'Error' 
   'pretty-error > header > title > kind': {
      // which we can hide: 
      display: 'none'
   },
 
   // the 'colon' after 'Error': 
   'pretty-error > header > colon': {
      // we hide that too: 
      display: 'none'
   },
 
   // our error message 
   'pretty-error > header > message': {
      // let's change its color: 
      color: 'bright-white',
 
      // we can use black, red, green, yellow, blue, magenta, cyan, white, 
      // grey, bright-red, bright-green, bright-yellow, bright-blue, 
      // bright-magenta, bright-cyan, and bright-white 
 
      // we can also change the background color: 
      background: 'cyan',
 
      // it understands paddings too! 
      padding: '0 1' // top/bottom left/right 
   },
 
   // each trace item ... 
   'pretty-error > trace > item': {
      // ... can have a margin ... 
      marginLeft: 2,
 
      // ... and a bullet character! 
      bullet: '"<grey>o</grey>"'
 
      // Notes on bullets: 
      // 
      // The string inside the quotation mark gets used as the character 
      // to show for the bullet point. 
      // 
      // You can set its color/background color using tags. 
      // 
      // This example sets the background color to white, and the text color 
      // to cyan, the character will be a hyphen with a space character 
      // on each side: 
      // example: '"<bg-white><cyan> - </cyan></bg-white>"' 
      // 
      // Note that we should use a margin of 3, since the bullet will be 
      // 3 characters long. 
   },
 
   'pretty-error > trace > item > header > pointer > file': {
      color: 'bright-cyan'
   },
 
   'pretty-error > trace > item > header > pointer > colon': {
      color: 'cyan'
   },
 
   'pretty-error > trace > item > header > pointer > line': {
      color: 'bright-cyan'
   },
 
   'pretty-error > trace > item > header > what': {
      color: 'bright-white'
   },
 
   'pretty-error > trace > item > footer > addr': {
      display: 'none'
   }
});