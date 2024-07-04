(function(){
	const reWaitChar = /\@/g;
	let popLineId = 0;
	let popCnt = 0;
	let waitCnt = 0;
	let timer;
	let speechActive = true;
	const __onload = window.onload;
	window.onload = function(){
		if (__onload) __onload.call(this);
		const fuwaPop = document.getElementById('fuwaPop');
		if (fuwaPop) {
			timer = setTimeout(update.bind(this, fuwaPop), 120);
		}
		const div = document.getElementById("fuwaPopSpeech");
		if (div){
			const input = div.querySelector(`input[type="button"]`);
			if (input){
				input.onclick = onSpeechClick.bind(this, input);
				onSpeechClick(input);
			}
		}
	}
	function onSpeechClick(input){
		popLineId = 0;
		popCnt = 0;
		waitCnt = 0;
		speechSynthesis.cancel();
		if (speechActive){
			input.value = "喋ってもらう"
		}else{
			input.value = "喋らないでもらう"
		}
		speechActive = !speechActive;
	}

	const speak   = new SpeechSynthesisUtterance();
	speak.rate  = 2;
	speak.pitch = 2;
	speak.lang  = 'ja-JP';
	function readText(text){
		speak.text  = text
		.replace(/@/g, "　")
		.replace(/～/g, "ー")
		.replace(/[\r\n]/g, "")
		.replace(/[\s　]*([！？])[\s　]*/g, function(_, n){
			return n == "！" ? "!!" : "??";
		});
		speak.onend = function(){
			speak.text = "";
		}
		speechSynthesis.cancel();
		speechSynthesis.speak(speak);
	}

	function update(fuwaPop){
		updatePop(fuwaPop);
		if (timer) clearTimeout(timer);
		timer = setTimeout(update.bind(this, fuwaPop), 90);
	}

	function updatePop(fuwaPop){
		if (waitCnt > 0){
			waitCnt--;
		}else{
			if (popLineId >= $popQue.length){
				return;
			}
			const line = $popQue[popLineId];
			if(popCnt > line.length+10){ // セリフキューを次に送る
				if (!speechActive || speak.text.length == 0){
					if (++popLineId != $popQue.length){
						popCnt = 0;
						fuwaPop.innerText = "";
					}
				}
			}else{
				if (speechActive && popCnt == 0){
					readText(line);
				}
				const char = line[popCnt++];
				if (char) {
					if (char == "@") {
						waitCnt = 3;
					}else{
						let text = line.slice(0, popCnt);
						if (text.length != line.length) text += "_";
						fuwaPop.innerText = text.replace(reWaitChar, "");
					}
				}
			}
		}
	}
})();
