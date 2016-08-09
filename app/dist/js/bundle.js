(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var startApp = require('./start');
var close = require('./closeAdv');
var showElement = require('./showElement');
var showImage = require('./showImage');
var showImageText = require('./showImageText');
var generateDrop = require('./generateDrop');
var setSphere = require('./setSphere');
var imageText = require('./imageText');
var getPercent = require('./getPercent');
var rain = require('./rain');
var rainStop = require('./rainStop');
var rainStart = require('./rainStart');
var showFlash = require('./showFlash');

var wait = document.querySelector('.wait');
var sphere = document.querySelector('.sphere');
var frame = document.querySelector('.internals_frame');
var highLights = document.querySelector('.highlights');
var zipper = document.querySelector('.zipper');
var video = document.querySelector('.video');

generateDrop(50);
startApp();
close();

sphere.addEventListener('mousedown', function(e){

	var offset = e.clientY;
	var elementOffset = sphere.offsetTop
	
	function moveAt(e){		
		var fullOffset = e.clientY - offset + elementOffset;	
		return fullOffset;
	}

	document.onmousemove = function(e) {
    var movement = moveAt(e);
    if (movement <= 0) {
    	showElement(true, highLights);
    	showElement(true, video);
    	showImage(0);
    	setSphere(sphere, 0);
    } else if(movement > 0 && movement < 10) {
    	imageText.rethink.classList.remove('show-text');
    	imageText.rethink.style.opacity = '1';
    	showElement(false, video);
    	showElement(false, highLights);
    	showElement(false, wait);
    	showImageText([imageText.water], imageText.rethink);
    	showImage(getPercent(movement, 180));
    	setSphere(sphere, movement);
    	rainStop();
    } else if (movement >= 10 && movement < 90 ) {
    	if(rain.status) {
    		rainStart();
    	}
    	showImageText([imageText.rethink, imageText.capture], imageText.water);
    	showImage(getPercent(movement, 180));
    	setSphere(sphere, movement);
    } else if (movement === 90) {
    	showFlash()	
    	setSphere(sphere, movement);
    } else if (movement > 90 && movement < 120) {
    	showImageText([imageText.water, imageText.expanable], imageText.capture);
    	showImage(getPercent(movement, 180));
    	setSphere(sphere, movement);
    	rainStop();
    } else if(movement >= 120 && movement < 180) {
    	showImageText([imageText.capture], imageText.expanable);
    	showImage(getPercent(movement, 180));
    	showElement(false, zipper);
    	showElement(false, frame);
    	setSphere(sphere, movement);	
    } else if(movement >= 180) {
    	showElement(true, zipper);
    	showElement(true, frame)
    	showImage(100);
    	setSphere(sphere, 180);
    }
  }
	document.onmouseup = function() {
		document.onmousemove = null;
	}
})

sphere.ondragstart = function() {
  return false;
};

},{"./closeAdv":2,"./generateDrop":3,"./getPercent":4,"./imageText":6,"./rain":7,"./rainStart":8,"./rainStop":9,"./setSphere":10,"./showElement":11,"./showFlash":12,"./showImage":13,"./showImageText":14,"./start":15}],2:[function(require,module,exports){
var showElement = require('./showElement');

function closeAdv() {
	var close = document.querySelector('.close');
	var adv  = document.querySelector('.main');
	close.addEventListener("click", function() {
		showElement(false, adv);
	});
}

module.exports = closeAdv;
},{"./showElement":11}],3:[function(require,module,exports){
var getRandomNumber = require('./getRandomNumber');

function generateDrop(number) {
	//to add
	var rain = document.querySelector('.rain');
	for (var i = 0; i < number; i++) {
		var img = document.createElement('img');
		img.setAttribute('src', '/public/images/raindrop_'+ getRandomNumber(1,4) +'.png');
		img.style.position = 'absolute';
		img.style.opacity = '0';
		img.style.top = getRandomNumber(1,190) + 'px';
		img.style.left = getRandomNumber(0, 470) + 'px';
		img.classList.add('drop');
		rain.appendChild(img);
	}
}

module.exports = generateDrop
},{"./getRandomNumber":5}],4:[function(require,module,exports){
function getPercent(number, fromNumber) {
	return number*100/fromNumber;
}

module.exports = getPercent
},{}],5:[function(require,module,exports){
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandomNumber
},{}],6:[function(require,module,exports){
var imageRethink = document.querySelector('.rethink');
var imageWater = document.querySelector('.water');
var imageCapture = document.querySelector('.capture');
var imageExpanable = document.querySelector('.expandable');

module.exports = {
	rethink : imageRethink,
	water : imageWater,
	capture : imageCapture,
	expanable : imageExpanable  
} 
},{}],7:[function(require,module,exports){
var rain = document.querySelector('.rain');
module.exports = {rain: rain, status: true }
},{}],8:[function(require,module,exports){
var getRandomNumber = require('./getRandomNumber');
var _ = require('./rain');

function rainStart() {
	_.status = false;
	_.rain.style.opacity = '1';	
	
	var node = document.querySelectorAll('.drop');
	for (var i = 0; i < node.length; i++) {
		(function(i) {
			setTimeout(function(){
				if(node.length-1 === i) {
					finishRain = true;
				}
				node[i].classList.add('rain-animation');
				
			}, getRandomNumber(100, 7000))
		})(i);
	}
}

module.exports = rainStart
},{"./getRandomNumber":5,"./rain":7}],9:[function(require,module,exports){
var _ = require('./rain');

function rainStop() {
	_.rain.style.opacity = '0';
	var node = document.querySelectorAll('.drop');
	for (var i = 0; i < node.length; i++) {
		node[i].classList.remove('rain-animation');
	}
	_.status = true;
}

module.exports = rainStop
},{"./rain":7}],10:[function(require,module,exports){
function setSphere(sphere, offset) {
	sphere.style.top = offset + 'px';
}

module.exports = setSphere
},{}],11:[function(require,module,exports){
function showElement(bool, element) {
	if (bool) {
		element.style.display = 'block';
	}
	if (!bool) {
		element.style.display = 'none';
	}
}

module.exports = showElement;
},{}],12:[function(require,module,exports){
var flash = document.querySelector('.flash');
function showFlash(){
	flash.classList.add('flash-animation');
	setTimeout(function(){
		flash.classList.remove('flash-animation'); 
	}, 1000)
}
module.exports = showFlash
},{}],13:[function(require,module,exports){
var img = document.querySelector('.phone');

function showImage(percent) {
	var image = Math.floor(59*percent/100);
	if(image < 10) {
		image = '0'+image;
	}
	img.setAttribute('src', '/public/images/phone/phone_000'+image+'.png')
}

module.exports = showImage;
},{}],14:[function(require,module,exports){
function showImageText(block, current) {
	for (var i = 0; i < block.length; i++) {
		block[i].style.display = 'none';
	}
	current.style.display = 'block';
}

module.exports = showImageText
},{}],15:[function(require,module,exports){
function startApp(){
	var centerBlock = document.querySelector('.main-images');
	centerBlock.classList.add('show-center-block'); 
	var rethink = document.querySelector('.rethink');
	rethink.classList.add('show-text');
	var hint = document.querySelector('.hint');
	hint.classList.add('show-hint');
	var button = document.querySelector('.button');
	button.classList.add('show-button');
	var scroll = document.querySelector('.scroll');
	scroll.classList.add('show-scroll');
}

module.exports = startApp;

},{}]},{},[1]);
