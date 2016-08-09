var showElement = require('./showElement');

function closeAdv() {
	var close = document.querySelector('.close');
	var adv  = document.querySelector('.main');
	close.addEventListener("click", function() {
		showElement(false, adv);
	});
}

module.exports = closeAdv;