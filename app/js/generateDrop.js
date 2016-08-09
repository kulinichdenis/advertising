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