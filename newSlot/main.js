(function(){
const SLOT_SIZE = 4;
const SLOT_ANSWER = 7777;
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
	for (let i = 0; i < hints.length; i++){
		hints[i].disabled = true;
	}

	button.innerText = strButton[2];
	button.disabled = true;
	const body = document.body;
	body.style.transitionDuration = "1s";
	body.style.backgroundImage = "url(img/5-1.jpg)";
	setPop(strFuwaPop[2]);
	PointManager.requestClearFlag(1);
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
	for (let i = 0; i < hints.length; i++){
		hints[i].onclick = showHint.bind(this, i);
	}

	// ポップの設定
	setPop(strFuwaPop[0]);
	setInterval(updatePop, 60);
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

function showHint(i){
	setPop(strFuwaHint[i]);
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
"スロットの画像を右クリックして「検証(Chrome)」または「調査(FireFox)」を押すと、ソースコード上のどこでこの画像を表示してるか確認できるよ！",
"<img src=\"img/数字.png\">の数字の部分をダブルクリックして他の数字に変えてみよう！",
"４つのリールの画像をすべてimg\/7.pngにすると....？",
]
})();
