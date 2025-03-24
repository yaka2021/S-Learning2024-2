(function(){
const SLOT_SIZE = 4;
const SLOT_ANSWER = 7777;

var tooltip_p = 999; //ツールチップのパターン名

function preloadImages(){
	for (let i = 1; i <= 9; i++){ new Image("img/"+i+".png"); }
	new Image("img/5-1.jpg");
}

function createSlotImage(){
	const parent = document.getElementById("slotImg");
	for (let i = 0; i < SLOT_SIZE; i++){
		let td = document.createElement("td");
		let img = new Image();
		img.src = "img/10.png";
		td.appendChild(img);
		parent.append(td);
	}
}

function getSlotNumber(){
	num = 0;
	const parent = document.getElementById("slotImg").children;
	const re = /img\/(\d+)\.png$/;
	for (let i = 0; i < SLOT_SIZE; i++){
		re.test(parent[i].children[0].src);
		num += (10 ** (SLOT_SIZE - i - 1)) * Math.floor(RegExp.$1 || 0);
	}
	return num;
}

function setSlotImage(number){
	if (typeof number != 'number') {
		number = Math.floor(Math.random() * 7200);
	}
	const parent = document.getElementById("slotImg").children;
	let j = 10 ** SLOT_SIZE;
	for (let i = 0; i < SLOT_SIZE; i++){
		j = Math.floor(j / 10);
		let ans = Math.floor(number / j) % 10;
		parent[i].children[0].src = "img/" + ans + ".png";
	};
}

function rollSlot(button){
	if (button.innerText == strButton[1]){
		button.disabled = true;
	}else{
		button.innerText = strButton[1];
		updateRoll();
	}
}

function updateRoll(){
	const num = getSlotNumber();
	const button = document.getElementById("launchSlot");
	if (button.disabled == true){
		button.innerText = strButton[0];
		button.disabled = false;
		if (num == SLOT_ANSWER){
			gameClear(button);
		}else{
			setPop(strFuwaPop[1]);
		}
		return;
	}
	if (num == SLOT_ANSWER){
		gameClear(button);
	}else{
		setSlotImage();
		setTimeout(updateRoll, 50);
	}
}

function gameClear(button){
	const hints = document.querySelectorAll(".HINT button");
	for (let i = 0; i < hints.length - 1; i++){
		hints[i].disabled = true;
	}

	button.innerText = strButton[2];
	button.disabled = true;
	const body = document.body;
	body.style.transitionDuration = "1s";
	body.style.backgroundImage = "url(img/5-1.jpg)";
	setPop(strFuwaPop[2]);
	//FLAG2取得
	PointManager.requestClearFlag(2);
	//ブラウザの×ボタンやページ移動ボタンを押しても警告画面が出ないようにする
	window.onbeforeunload = null;
}

// 初期状態
window.onload = function(){
	preloadImages();
	createSlotImage();

	// ボタン設定
	const button = document.getElementById("launchSlot");
	button.innerText = strButton[0];
	button.onclick = rollSlot.bind(this, button);

	// ヒントボタン
	const hints = document.querySelectorAll(".HINT button");
	for (let i = 0; i < hints.length - 1; i++){
		hints[i].onclick = showHint.bind(this, i);
	}

	// ポップの設定
	setPop(strFuwaPop[0]);
	setInterval(updatePop, 60);
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

function showHint(i){
	tooltip_p = i; //ツールチップのパターン名をセット
	setPop(strFuwaHint[i]);
}

function updatePop(){
	if (fuwaPopCnt < fuwaPopText.length){
		let char;
		if(tooltip_p == 1 && fuwaPopCnt >= 88 && fuwaPopCnt <= 93){
		char = "<span class='tooltip' style = 'color: aqua; background-color: blue;'>" + fuwaPopText[fuwaPopCnt++] + "<span class='balloon_top'>Webサイトの様々な情報を取得する事ができるツールのこと。名前の通り、エンジニアがWebサイトを開発する際に用いることが多いです！</span></span>";
		if(fuwaPopCnt == 94){
		tooltip_p = 999; //初期化
		}
		}
		else if(tooltip_p == 2 && fuwaPopCnt >= 10 && fuwaPopCnt <= 13){
		char = "<span class='tooltip' style = 'color: aqua; background-color: blue;'>" + fuwaPopText[fuwaPopCnt++] + "<span class='balloon_top'>Webページを作成するために使用する言語のこと。タグと呼ばれる要素で構成されています！タグの例：&lt;img&gt;（画像を表示させるために使用するタグです。）</span></span>";
		if(fuwaPopCnt == 14){
		tooltip_p = 999;　//初期化
		}
		}
		else{
		char = fuwaPopText[fuwaPopCnt++];
		}
		const popText = document.getElementById("popText");
		let element;
		if (char == "\n"){
			element = document.createElement("br");
		}
		else{
			element = document.createElement("div");
			element.innerHTML = char;
			element.className = "popChar";
		}
		popText.append(element);
	}

}

const strButton = [
	"スロットを回す",
	"停止",
	"ゲームクリア！",
];

const strFuwaPop = [
"レベル１はスロットからスタートです！\n７７７７を目指してがんばりましょう！",
"残念....ちなみに通常プレイでは絶対に７７７７はでない仕様になっています\n裏口を探してみましょう",
"You got the flag!\nゲームクリアです！",
];

const strFuwaHint = [
"スロットに表示されている４つの数字をすべて７に揃えた後、「スロットを回す」ボタンをクリックすることです！\n（４つの数字が表示されていない場合は一度スロットを回しましょう）",
"演習画面の好きな場所を右クリックして、「検証（Chromeの場合）or 調査（Firefoxの場合）\n or 開発者ツールで調査する（Edgeの場合）」の項目をクリックすると、開発者ツールが使えるよ！",
"画面右上に表示されたHTMLの中には\n<img src=\"img\/★.png\">と書かれた部分が４つあります。探してみよう！（★はランダムな数字が入ります）\n「▶」の部分をクリックすると隠れている部分を見ることができるよ！",
"<img src=\"img\/★.png\">の★の部分をダブルクリックして7に書き替えると....？",
];

})();
