(function(){
	// 初期状態
	window.onload = function(){
		// ポップの設定
		setPop(strFuwaPop[0]);
		setInterval(updatePop, 60);
		// ヒントボタン
		const hints = document.querySelectorAll(".HINT button");
		for (let i = 0; i < hints.length - 1; i++){
			hints[i].onclick = showHint.bind(this, i);
		}
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

	window.onbeforeunload = function(e) {
  	e.preventDefault();
  	return '';
	};

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
				setPop(strFuwaPop[1]);
				break;
			case 1:
				PointManager.requestClearFlag(5);
				const button = document.getElementsByClassName("hint");
				for (let i = 0; i < button.length; i++){
					button[i].disabled = true;
				}
				submit.disabled = true;
				setPop(strFuwaPop[2]);
				window.onbeforeunload = null;
				break;
		}
	}

	function showHint(i){
		setPop(strFuwaHint[i]);
	}

	const ans = [12477, 12524, 12452, 12518, 12398, 19992];
	function judgeAnswer(){
		const input = document.getElementById('placeName');
		const ansStr = ans.map(num=>String.fromCharCode(num)).join("");
		if(ansStr == input.value){
			placeName.value="";
			return 1;
		}
		else if(input.value != ''){
			placeName.value="";
			return 0;
		}
	}

const strFuwaPop = [
	"わぁ、素敵な場所ですね！\nここがどこだかわかりますか？",
	"うーん、多分そこじゃない気がします……。",
	"You got the flag!\nそうです、そこでした！"
];

const strFuwaHint = [
	"左の画像を右クリックして[名前を付けて画像を保存]をクリックして\nダウンロードしてみよう",
	"ダウンロードした画像を右クリックしてプロパティを開いてみよう",
	"プロパティの中の詳細ボタンを押してみると..."
];
})();
