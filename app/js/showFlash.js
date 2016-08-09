var flash = document.querySelector('.flash');
function showFlash(){
	flash.classList.add('flash-animation');
	setTimeout(function(){
		flash.classList.remove('flash-animation'); 
	}, 1000)
}
module.exports = showFlash