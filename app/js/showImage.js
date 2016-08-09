var img = document.querySelector('.phone');

function showImage(percent) {
	var image = Math.floor(59*percent/100);
	if(image < 10) {
		image = '0'+image;
	}
	img.setAttribute('src', '/public/images/phone/phone_000'+image+'.png')
}

module.exports = showImage;