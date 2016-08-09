function showImageText(block, current) {
	for (var i = 0; i < block.length; i++) {
		block[i].style.display = 'none';
	}
	current.style.display = 'block';
}

module.exports = showImageText