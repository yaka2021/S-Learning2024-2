(function(){
	// 初期状態
	window.onload = function(){
		// ポップの設定
		setPop(strFuwaPop[0]);
		setInterval(updatePop, 60);
		const submit = document.getElementById('submit');
		if (submit){
			submit.onclick = onSubmit.bind(this, submit);
			const input = document.getElementById('placeName');
			input.addEventListener('keypress', function(e){
				if (e.charCode == 13){
					submit.click();
				}
			}.bind(this));
		}
	}

	let fuwaPopCnt = 0;
	let fuwaPopText = "";
	function setPop(text){
		if (text != fuwaPopText){
			fuwaPopCnt = 0;
			fuwaPopText = text
			const popText = document.getElementById("popText");
			popText.innerText = "";
		}
	}

	function updatePop(){
		if (fuwaPopCnt < fuwaPopText.length){
			const char = fuwaPopText[fuwaPopCnt++];
			const popText = document.getElementById("popText");
			let element
			if (char == "\n"){
				element = document.createElement("br");
			}else{
				element = document.createElement("div");
				element.innerText = char;
				element.className = "popChar";
			}
			popText.append(element);
		}
	}

	function onSubmit(submit){
		switch(judgeAnswer()){
			case 0:
				setPop(strFuwaPop[3]);
				break;
			case 1:
				setPop(strFuwaPop[1]);
				break;
			case 2:
				PointManager.requestClearFlag(10);
				submit.disabled = true;
				setPop(strFuwaPop[2]);
				break;
		}
	}

	const ans = [12477, 12524, 12452, 12518, 12398, 19992];
	function judgeAnswer(){
		const input = document.getElementById('placeName');
		if (input){
			if (input.value.length == 0){
				return 0;
			}else{
				const ansStr = ans.map(num=>String.fromCharCode(num)).join("");
				return ansStr == input.value ? 2 : 1;
			}
		}else{
			return 1;
		}
	}

const strFuwaPop = [
	"わぁ、素敵な場所ですね！\nここがどこだかわかりますか？",
	"うーん、多分そこじゃない気がします……。",
	"You got the flag!\nそうです、そこでした！",
	"画像ファイルの情報を見れば何かわかるかもしれませんね……",
];
})();
