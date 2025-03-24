(function(){
	// 初期状態
	var tooltip_p = 999; //ツールチップのパターン名
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

	//演習中にブラウザの×ボタンやページ移動ボタンを押した際に警告画面を出す
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
			let char;
			if(tooltip_p == 2 && fuwaPopCnt >= 0 && fuwaPopCnt <= 7){
			char = "<span class='tooltip' style = 'color: aqua; background-color: blue;'>" + fuwaPopText[fuwaPopCnt++] + "<span class='balloon_top'>ファイル管理ができるアプリケーションのこと。\n 画面下部の<img src='./explorer.png' alt='エクスプローラー' >のアイコンをクリックすると開くことが出来ます！(このアイコンはWindows10を使用した場合のものです。)また、ダウンロードした画像は通常「ダウンロード」の項目に格納されているよ！</span></span>";
			if(fuwaPopCnt == 8){
			tooltip_p = 999; //初期化
			}
			}
			else{
			char = fuwaPopText[fuwaPopCnt++];
			}
			const popText = document.getElementById("popText");
			let element
			if (char == "\n"){
				element = document.createElement("br");
			}else{
				element = document.createElement("div");
				element.innerHTML = char;
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
				//FLAG5取得
				PointManager.requestClearFlag(5);
				const button = document.getElementsByClassName("hint");
				for (let i = 0; i < button.length; i++){
					button[i].disabled = true;
				}
				submit.disabled = true;
				setPop(strFuwaPop[2]);
				//ブラウザの×ボタンやページ移動ボタンを押しても警告画面が出ないようにする
				window.onbeforeunload = null;
				break;
		}
	}

	function showHint(i){
		tooltip_p = i; //ツールチップのパターン名をセット
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
	"左に表示されている画像を撮影した場所を特定した後、その場所の\n名前を下部の入力欄に入力し、「答える」ボタンを押すことです！",
	"左に表示されている画像を右クリックした後、「名前を付けて画像を保存」\nの項目をクリックしてダウンロードしてみよう！",
	"エクスプローラーを開いてダウンロードした画像（IMG_6621.jpg）を\n右クリックした後、「プロパティ」の項目をクリックしてみよう！",
	"プロパティ画面の上部にある詳細ボタンをクリックすると...？"
];
})();
