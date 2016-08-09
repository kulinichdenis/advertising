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