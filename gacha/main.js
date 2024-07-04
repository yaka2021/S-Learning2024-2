(function(){
let $app, $fuwaText = "", $fuwaCnt = 0;
let $voiceActive = false;
let $clearFlag = false;

window.onload = function(){
	createPixiRenderer();
	toModeSelect();
	setInterval(update, 60);
}

const toModeSelect = function(){
	const button1 = createSprite("voice1.png");
	const button2 = createSprite("voice2.png");
	const updateButton = sp =>{
		if (sp.__sanoCnt == 1){
			sp.scale.x = sp.scale.y = Math.min(sp.scale.y + 0.04, 1.1);
			sp.alpha = Math.min(sp.alpha + 0.05, 1);
		}else{
			sp.scale.x = sp.scale.y = Math.max(sp.scale.y - 0.07, 1);
			sp.alpha = Math.max(sp.alpha - 0.05, sp.__sanoMax);
		}
	}
	const mouseover = sp => {
		if (sp.__sanoCnt != 1){
			sp.__sanoCnt = 1;
			setFuwaPop(sp == button1 ? "ふわりんのセリフを読み上げます" : "ふわりんのセリフを読み上げません");
		}
	}
	const mouseout  = sp => sp.__sanoCnt = 0;
	const onclick = sp =>{
		$voiceActive = sp == button1;
		const restButton = sp == button1 ? button2 : button1;
		sp.interactive = false;
		restButton.interactive = false;

		sp.__sanoUpdate = ()=>{
			sp.scale.x = sp.scale.y += 0.23;
			sp.alpha -= 0.05;
			if (sp.alpha < -1){
				toTitle();
				setFuwaPop($fuwaLines[0]);
			}
		}
		restButton.__sanoUpdate = ()=>{
			restButton.alpha -= 0.2;
		}
	}
	const setCommonAsButton = function(sp){
		sp.interactive = true;
		sp.anchor.x = sp.anchor.y = 0.5;
		sp.alpha = sp.__sanoMax = 0.8;
		sp.__sanoCnt = 0;
		sp.on('mouseover',	mouseover.bind(this, sp));
		sp.on('mouseout',	mouseout.bind(this,  sp));
		sp.on('click',		onclick.bind(this, sp));
		sp.__sanoUpdate = updateButton.bind(this,  sp)
	}

	button1.x = $app.view.width >> 2;
	button1.y = $app.view.height >> 1;
	button2.x = button1.x * 3;
	button2.y = button1.y;
	setCommonAsButton(button1);
	setCommonAsButton(button2);
}

const createPixiRenderer = ()=>{
	$app = new PIXI.Application({
		width: 1212, height: 683, backgroundColor: 0x000000,
	});
	const canvas = $app.view;
	canvas.style.width= "100%";

	const ele = document.getElementById('app');
	ele.innerHTML = "";
	ele.appendChild(canvas);
}

const setInit = ()=>{
	const stage = $app.stage;
	stage.filters = [];
	for (let i = stage.children.length - 1; i >= 0; i--) {
		const sp = stage.children[i];
		stage.removeChild(sp);
		sp.destroy();
	}
}

function setFuwaPop(text){
	if ($voiceActive) readText(text);
	$fuwaText = text;
	$fuwaCnt = 0;
}

function readText(text){
	const speak   = new SpeechSynthesisUtterance();
	speak.text  = text;
	speak.rate  = 2;
	speak.pitch = 2;
	speak.lang  = 'ja-JP';
	speak.onend = function(){
		speak.text = "";
	}
	speechSynthesis.cancel();
	speechSynthesis.speak(speak);
}

const update = ()=>{
	const children = $app.stage.children;
	for (let i = children.length; i;){
		children[--i].__sanoUpdate && children[i].__sanoUpdate();
	}
	updateFuwaPop();
}

const updateFuwaPop = ()=>{
	if ($fuwaCnt != $fuwaText.length){
		const fuwaDiv = document.getElementById('fuwaMessagePop');
		fuwaDiv.innerText = $fuwaText.slice(0, ++$fuwaCnt);
	}
};

const isStonesValid = ()=>{
	const stoneNum = document.getElementById('stone');
	return stoneNum && Math.floor(stoneNum.innerText) >= 100;
}

const createSprite = imgPath=>{
	const sprite = new PIXI.Sprite(new PIXI.Texture.from("./img/"+imgPath));
	$app.stage.addChild(sprite);
	sprite.__sanoUpdate = null;
	return sprite;
}

const toTitle = ()=>{
	setInit();
	$app.stage.alpha = 0;
	const titleScreen = createSprite("presentation.png");

	const startButton = createSprite("button.png");
	startButton.x = $app.view.width >> 1;
	startButton.y = $app.view.height >> 1;
	startButton.anchor.x = 0.5;
	startButton.anchor.y = 0.5;
	startButton.__sanoCnt = 0;
	startButton.__sanoMax = 30;
	const rate = Math.PI / startButton.__sanoMax;
	startButton.__sanoUpdate = function(){
		$app.stage.alpha = Math.min($app.stage.alpha + 0.05, 1);
		if (++startButton.__sanoCnt == startButton.__sanoMax){
			startButton.__sanoCnt = 0;
		}
		startButton.scale.x = startButton.scale.y =
		Math.sin(startButton.__sanoCnt * rate) * 0.1 + 1;
	}

	startButton.interactive = true;
	const stoneNum = document.getElementById('stone');
	startButton.on('click', function(){
		if (isStonesValid()) {
			startButton.interactive = false;
			const shock = new PIXI.filters.ShockwaveFilter(
				[startButton.x, startButton.y],
				{	amplitude: 4,
					speed: 50,
					wavelength: 200,
					brightness: 1.5,
					radius: 500
				}
			);
			$app.stage.filters = [shock];
			startButton.__sanoUpdate = function(){
				if (shock.time < 25){
					shock.time += 1;
					stoneNum.innerText = Math.floor(stoneNum.innerText) - 4;
					$app.stage.alpha -= 0.05;
					startButton.scale.x = startButton.scale.y =
					Math.max(startButton.scale.y - 0.1, 0);
				}else{
					setFuwaPop($fuwaLines[2]);
					toLoadingScene();
				}
			};
		}else{
			setFuwaPop($fuwaLines[1]);
		}
	});
}

const setExplainDatum = datum =>{
	const img = document.getElementById("explainImg");
	const text = document.getElementById("explainText");
	if (datum){
		img.src = "img/cards/" + datum.img;
		text.innerText = "【★" + datum.rate + "】" + datum.title;
	}else{
		img.src = "img/cards/back.jpg";
		text.innerText = "";
	}
}

//結果生成
const createResult = ()=>{
	const result = [];
	let ele = document.getElementById('explainImg');
	if ($clearFlag = /\/99\.jpg$/.test(ele.src)){
		ele = data.filter(datum => datum.rate == 9);
		for (let i = 0; i < 10; i++){
			result[i] = ele[Math.floor(Math.random() * ele.length)];
		}
	}else{
		for (let i = 0; i < 10; i++){
			let datum;
			do {
				datum = data[Math.floor(data.length * Math.random())];
				if      (datum.rate == 9){		continue;	}
				else if (datum.rate == 3){			break;	}
				else if (Math.random() < 0.5){		break;	}
			} while(true);
			result[i] = datum;
		}
	}
	return result;
}

const toLoadingScene = ()=>{
	setInit();
	$app.stage.alpha = 0;
	const bgSprite = createSprite("loading.jpg");
	bgSprite.x = $app.view.width >> 1;
	bgSprite.y = $app.view.height >> 1;
	bgSprite.anchor.x = 0.5;
	bgSprite.anchor.y = 0.5;
	bgSprite.__sanoCnt = 0;

	const zoomF = new PIXI.filters.ZoomBlurFilter();
	zoomF.strength = 5;
	zoomF.center = [bgSprite.x, bgSprite.y];

	const shock = new PIXI.filters.ShockwaveFilter(
		[bgSprite.x, bgSprite.y],
		{	amplitude: 4,
			speed: 50,
			wavelength: 200,
			brightness: 4,
			radius: 500
		}, 0
	);
	shock.enabled = false;
	bgSprite.filters = [zoomF, shock];

	let waitCnt = 60;

	let doneCnt = 0;
	const updateCard = sp=>{
		if (sp.__sanoCnt == 10){
			if (sp.__sanoDatum.rate > 3){
				shock.enabled = true;
				shock.time = 0;
//				shock.center = [sp.x, sp.__sanoTy-20];
			}
			sp.__sanoCnt--;
		}else if (sp.__sanoCnt > 0){
			sp.__sanoCnt--;
		}else if (sp.__sanoCnt == 0){
			setFuwaPop(sp.__sanoDatum.title + "！");
			setExplainDatum(sp.__sanoDatum);
			sp.__sanoCnt--;
		}else if (sp.__sanoCnt == -10){
			doneCnt++;
			sp.__sanoCnt--;
		}else if (sp.__sanoCnt > -10){
			sp.__sanoCnt--;
			sp.y = (sp.__sanoTy - sp.y) * (10+sp.__sanoCnt) / 10.0 + sp.y;
		}
	}
	const cardPadW = 160;
	let calcFirstXPos = n=>{
		return ($app.view.width - (n-1) * cardPadW) >> 1;
	}
	let x = calcFirstXPos(5), y = 690, i = 0;
	const cards = [];
	const result = createResult()
	result.forEach(datum=>{
		const sp = createSprite("cards/"+datum.img);
		sp.scale.x = sp.scale.y = 0.32;
		sp.anchor.x = 0.5;
		sp.x = x;
		sp.y = y;
		sp.__sanoTy = sp.y - 600;
		sp.__sanoDatum = datum;
		if (++i == 5){
			x = calcFirstXPos(5);
			y += 220;
		}else{
			x += cardPadW;
		};
		waitCnt += 15;
		switch (datum.rate){
			case 4: waitCnt += 8; break;
			case 5: waitCnt += 15; break;
		}
		sp.__sanoCnt = waitCnt;
		sp.__sanoUpdate = updateCard.bind(this, sp);
		cards.push(sp);
	});

	bgSprite.__sanoUpdate = function(){
		shock.time++;
		const cardFade = function(sp){
			if (sp.__sanoCnt == Infinity){
				return;
			}else if (sp.__sanoCnt != sp.__sanoMax){
				if (++sp.__sanoCnt >= 0){
					sp.y =	(sp.__sanoTy - sp.y) *
							sp.__sanoCnt / sp.__sanoMax + sp.y;
				}
			}else{
				sp.__sanoCnt = Infinity;
				doneCnt--;
			}
		}
		if (doneCnt == -result.length){
			if (++zoomF.strength == 30){
				if ($clearFlag){
					toClear();
					PointManager.requestClearFlag(3);
					setFuwaPop($fuwaLines[5]);
				}else{
					toTitle();
					PointManager.requestClearFlag(2);
					setFuwaPop($fuwaLines[3]);
					setTimeout(setFuwaPop.bind(this, $fuwaLines[4]), 3500);
				}
			}else{
				$app.stage.alpha = Math.max($app.stage.alpha - 0.07, 0);
			}
		}else if (doneCnt == result.length){
			for (let i = 0; i < cards.length; i++){
				const sp = cards[i];
				sp.__sanoCnt = (i % 5) * -6;
				sp.__sanoMax = 20;
				sp.__sanoTy = sp.y + (i < 5 ? -1 : 1) * 700;
				sp.__sanoUpdate = cardFade.bind(this, sp);
				doneCnt = 0;
			}
		}else if (bgSprite.__sanoCnt != 50){
			zoomF.strength = Math.max(zoomF.strength-0.1, 0);
			$app.stage.alpha = Math.min($app.stage.alpha + 0.08, 1);
			bgSprite.__sanoCnt++;
		}
	}
}

const toClear = ()=>{
	setInit();
	$app.stage.alpha = 0;
	let cnt = 0;
	const bgSprite = createSprite("thaks.jpg");
	bgSprite.x = $app.view.width  >> 1;
	bgSprite.y = $app.view.height >> 1;
	bgSprite.anchor.x = bgSprite.anchor.y = 0.5;
	bgSprite.__sanoUpdate = ()=>{
		$app.stage.alpha = Math.min($app.stage.alpha + 0.025, 1);
		if (cnt >= 240){
			$app.stage.alpha -= 0.05;
			if ($app.stage.alpha < 0){
				setFuwaPop("");
				setExplainDatum(null);
				toTitle();
			}
			return;
		}
		if (cnt == 66){
			setFuwaPop($fuwaLines[6]);
		}else if (cnt == 150){
			setFuwaPop($fuwaLines[7]);
		}
		cnt++;
	}
}


const $fuwaLines = [
	"こんにちは、ふわりんです！\n今日は１０連ガチャを回していきたいと思います！",
	"ガチャをまわそうにも石がありませんね……\nお金をかけずに増やせればいいんですが……",
	"おっ、なんかまわせるみたいですね！\nなにがでるのかな……",
	"お見事！　FLAG2 クリアです！",
	"実はこの演習にはFLAGがふたつあります。\nよければ幻のナンバー99を目指して頑張ってくださいね！",
	"幻のナンバー99がでました！\nFLAG3 クリアです！",
	"完走した感想ですが、こんなの絶対わかるわけないと思いました。",
	"ということで本日のガチャは以上となります。\n最後までご視聴、ありがとうございました。",
];

// 候補
const data = [
	//ここから★3
	{title:"チキンのトマト煮",		img:"1.jpg",	rate:3},
	{title:"肉じゃが",				img:"2.jpg",	rate:3},
	{title:"ハンバーグ",			img:"3.jpg",	rate:3},
	{title:"激辛麻婆豆腐",			img:"4.jpg",	rate:3},
	{title:"ハンバーガー",			img:"5.jpg",	rate:3},
	{title:"担々麺",				img:"6.jpg",	rate:3},
	{title:"生姜焼き",				img:"7.jpg",	rate:3},
	{title:"ドライカレー",			img:"8.jpg",	rate:3},
	{title:"ナポリタン",			img:"9.jpg",	rate:3},
	{title:"小籠包",				img:"10.jpg",	rate:3},
	{title:"餃子パーティ",			img:"11.jpg",	rate:3},
	{title:"たこ焼きパーティ",		img:"12.jpg",	rate:3},
	{title:"クレープ",				img:"13.jpg",	rate:3},
	{title:"パフェ",				img:"14.jpg",	rate:3},
	{title:"クッキー",				img:"15.jpg",	rate:3},
	{title:"台風待ったなし",		img:"16.jpg",	rate:3},
	{title:"茶碗蒸し",				img:"17.jpg",	rate:3},
	{title:"卵かけごはん",			img:"18.jpg",	rate:3},
	{title:"かぼちゃの煮物",		img:"19.jpg",	rate:3},
	{title:"豊穣",					img:"20.jpg",	rate:3},
	{title:"カレー",				img:"21.jpg",	rate:3},
	{title:"かぼちゃのポタージュ",	img:"22.jpg",	rate:3},
	{title:"焼きおにぎり",			img:"23.jpg",	rate:3},
	{title:"ツナ・ピザ",			img:"24.jpg",	rate:3},
	{title:"ジェノベーゼ",			img:"25.jpg",	rate:3},
	{title:"ラーメン",				img:"26.jpg",	rate:3},
	{title:"からあげアニバーサリ",	img:"27.jpg",	rate:3},
	{title:"お好み焼き",			img:"28.jpg",	rate:3},
	{title:"豚汁",					img:"29.jpg",	rate:3},
	{title:"炊き込みごはん",		img:"30.jpg",	rate:3},
	//ここから★4
	{title:"ローストビーフ",		img:"31.jpg",	rate:4},
	{title:"手作りケーキ",			img:"32.jpg",	rate:4},
	{title:"ビーフシチュー",		img:"33.jpg",	rate:4},
	{title:"手作りパン",			img:"34.jpg",	rate:4},
	{title:"ふわとろオムライス",	img:"35.jpg",	rate:4},
	{title:"チーズタッカルビ",		img:"36.jpg",	rate:4},
	{title:"ラザニア",				img:"37.jpg",	rate:4},
	{title:"イマジナリ・アラウドン",img:"38.jpg",	rate:4},
	{title:"トマトソースのパスタ",	img:"39.jpg",	rate:4},
	{title:"親子丼",				img:"40.jpg",	rate:4},
	{title:"サラダ",				img:"41.jpg",	rate:4},
	{title:"ブリのあら煮",			img:"42.jpg",	rate:4},
	{title:"パンケーキ",			img:"43.jpg",	rate:4},
	{title:"天ぷらの晩餐",			img:"44.jpg",	rate:4},
	{title:"干物",					img:"45.jpg",	rate:4},
	//ここから★5
	{title:"焼肉",				img:"46.jpg",	rate:5},
	{title:"ステーキ",			img:"47.jpg",	rate:5},
	{title:"ヘブンズ・ビール",	img:"48.jpg",	rate:5},
	{title:"寿司",				img:"49.jpg",	rate:5},
	{title:"理想の燻製",		img:"50.jpg",	rate:5},

	{title:"メタボリックホリデー",		img:"99.jpg",	rate:9},
];
})();
