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