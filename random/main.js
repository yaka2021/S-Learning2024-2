(function(){
	let buttonFlg	= 0; // 0...開始前 1...実行中 2...停止中 3...クリア
	let slotNumber	= 0; // 表示中の数字
	let hintTime	= 0; // ヒント表示回数

	// 初回ロード時の処理
	window.onload = function(){
		const stop = document.getElementById("stop");
		if (stop){ stop.onclick = onButtonClick.bind(this, stop); }
		const hint = document.getElementById("hint");
		if (hint){ hint.onclick = showHint.bind(this, hint); }
		setInterval(update, 33);
	}

	// クリア条件
	function isNumberMatched(){
		return slotNumber == 65535;
	}

	// ボタンを押した時の処理
	function onButtonClick(stop){
		switch (buttonFlg){
			case 0:// 開始前
			case 2:// 停止中
				buttonFlg = 1;
				stop.innerText = "停止";
				break;
			case 1:// 実行中
				if (isNumberMatched()){
					// 数字がマッチした場合
					buttonFlg = 3;
					stop.disabled = true;
					stop.innerText = "クリア";

					const slotTag = document.getElementById("slot");
					slotTag.style.color = "gold";
					PointManager.requestClearFlag(5);
				}else{
					// はずれの場合
					buttonFlg = 2;
					stop.innerText = "再開";
				}
				break;
		}
	};

	// *毎フレーム実行　更新処理
	function update(){
		if (buttonFlg == 1){
			setNumber();
			refreshNumberTag();
		}
	}

	// スロットの数字を決める
	function setNumber(){
		slotNumber = Math.floor(65535*Math.random());
	}

	// スロットの表示を変更
	function refreshNumberTag(){
		const slotTag = document.getElementById("slot");
		slotTag.innerText = slotNumber;
		slotTag.style.color = isNumberMatched() ? "red" : "inherit";
	}




// 以下ヒント
	function showHint(hint){
		const newTag = document.createElement("p");
		newTag.style.textAlign = "left";
		newTag.innerHTML = "<span>ヒント"+(hintTime+1)+":</span> "+hintText[hintTime++];
		document.getElementById("hintBox").appendChild(newTag);
		if (hintTime >= hintText.length){
			hint.disabled = true;
		};
	};
const hintText = [
`<span>Math.random</span>という関数は0.0から1.0未満の乱数をランダムで返す処理だ。`,
`この演習の場合は[65535 × Math.random()]というようにスロットが計算されており、乱数の最大値が0.999...で切り捨てのため65535は絶対に出ないようになっている。`,
`このページ上で<span>検証</span>-><span>Console</span>に<br>
<span>Math.random = function () { return 1 };</span> と打って実行してみよう。`
];
})();
