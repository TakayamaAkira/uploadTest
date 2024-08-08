function possibleInputTabKey(event, thisObject) {
  
	if(event.code !== 'Tab') {
		return;
	} else {
		// 何もせず次の処理へ。
	}

	event.preventDefault();

	const currentPosition = thisObject.selectionStart;
	const stringLeft = thisObject.value.substring(0, currentPosition);
	const stringRight = thisObject.value.substring(currentPosition, thisObject.value.length);

	thisObject.value = stringLeft + '\t' + stringRight;

	thisObject.selectionEnd = currentPosition + 1;

	return;

}