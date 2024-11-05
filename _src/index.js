(function() {
	const reWaitChar = /\@/g;
	let popLineId = 0;
	let popCnt = 0;
	let waitCnt = 0;
	let timer;
	const __onload = window.onload;

	window.onload = function() {
		if (__onload) __onload.call(this);
		const fuwaPop = document.getElementById('fuwaPop');
		if (fuwaPop) {
			timer = setTimeout(update.bind(this, fuwaPop), 120);
		}
	}

	function update(fuwaPop) {
		updatePop(fuwaPop);
		if (timer) clearTimeout(timer);
		timer = setTimeout(update.bind(this, fuwaPop), 90);
	}

	function updatePop(fuwaPop) {
		if (waitCnt > 0) {
			waitCnt--;
		} else {
			if (popLineId >= $popQue.length) {
				return;
			}
			const line = $popQue[popLineId];
			if (popCnt > line.length + 10) { // セリフキューを次に送る
				if (++popLineId != $popQue.length) {
					popCnt = 0;
					fuwaPop.innerText = "";
				}
			} else {
				const char = line[popCnt++];
				if (char == "@") {
					waitCnt = 5;
				} else {
					let text = line.slice(0, popCnt);
					if (text.length != line.length) text += "_";
					fuwaPop.innerText = text.replace(reWaitChar, "");
				}
			}
		}
	}
})();
