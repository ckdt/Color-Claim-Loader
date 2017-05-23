/*! Color Claim Loader  v@0.0.1 http://github.com/ */

$(function(){
	// Global Variables
	var dataUrl = "data/colorclaim.1.5.sketchpalette.json";
	var colorPalette = [];

	// Functions
	function init(){
		initColorPalette( dataUrl );
	}

	function initColorPalette( datasrc ){
		$.getJSON( datasrc , function( data ) {
			$.each( data.colors, function(key, val) {

				var red = calcColor(data.colors[key].red);
				var green = calcColor(data.colors[key].green);
				var blue = calcColor(data.colors[key].blue);
				var alpha = data.colors[key].alpha;

				// rgba string
				var rgba = "rgba(" + red + "," + green + "," + blue + "," + alpha + ");";

				// hex
				var hex = rgb2hex(rgba);

				// contrast delta
				var delta = (red * 0.299) + (green * 0.587) + (blue * 0.114);

				colorPalette.push({
					'rgba': rgba,
					'hex' : hex,
					'delta': delta
				});
			});

			applyColors();
		});
	}

	function applyColors(){
		var key = getRandomKey();				// random key

		var bgClr = colorPalette[key].hex;		// pick color based on random key
		var frClr = calContrastColor(key);		// calculate contrast color based on picked color

		// apply colors on stuff
		$("body").animate({ backgroundColor: bgClr }, 1000);
		$("h1,p,a").animate({ color: frClr }, 1000);
		$(".card, .button").animate({ color: frClr, borderColor: frClr });

		// Card info
		$(".num").html((key+1));
		$(".hex").html(bgClr);				
	}


	// Utilities
	function getRandomKey(){
		var min = 0;
		var max = colorPalette.length;
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function calcColor( val ){
		return Math.floor(val * 255);
	}

	function rgb2hex(rgb){
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}

	function calContrastColor(key){
		var delta = colorPalette[key].delta;
		var threshold = 105;
		return((255 - delta) < threshold) ? "#000000" : "#ffffff";  
	}

	// start the show
	init();
});