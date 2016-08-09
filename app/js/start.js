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
