function showElement(bool, element) {
	if (bool) {
		element.style.display = 'block';
	}
	if (!bool) {
		element.style.display = 'none';
	}
}

module.exports = showElement;