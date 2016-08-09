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
