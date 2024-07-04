(function(){
	let popText = "";
	let popCnt = 0;
	let roboCnt = 0;
	let roboFlag = 0;
	const roboLine = [
		"みんなでピザをわけるロボ！",
		"おいしいピザロボ！　みんなよろこぶロボよ！",
		"おなかがすいてきたロボ！",
		"ボロのダイスキなペペロニネジのピザロボ！"
	];
	window.onload = function(){
		drawCircle();
		const ipt_num = document.getElementById("ipt_num");
		const cm_num  = document.getElementById("cm_num");
		cm_num.onchange = ipt_num.onchange = adjustNum.bind(this, ipt_num, cm_num);

		const buttonS = document.getElementById("calcSurface");
		buttonS.onclick = calcSurface.bind(this, ipt_num, cm_num, buttonS);
		document.getElementsByClassName("robo-image")[0].onclick = robotSpeaks;
		refreshPizza();
		robotSpeaks();
		setInterval(update,60);
		const showHint = document.getElementById("showHint");
		if (showHint){
			showHint.onclick = onShowHint.bind(this);
		}
	}

	function onShowHint(){
		const hints = document.getElementsByClassName("hint");
		for (let i = 0; i < hints.length; i++){
			hints[i].style.display = "block";
		}
	}

	function adjustNum(ipt, cm){
		ipt.value = Math.max(Math.min(parseInt(ipt.value), 127), 1);
		cm.value  = Math.max(Math.min(parseInt(cm.value), 255),  1);
		refreshPizza();
	}

	function parseValue(n){
		try{
			n = eval(n);
			return typeof n == "number" ? n : 1;
		}catch{
			return 1;
		}
	}

	function calcSurface(ipt, cm, button){
		let ppl  = parseValue(ipt.value);
		let size = parseValue(cm.value);
		if (ppl){
			let r = size * 0.5;
			let answer = (r ** 2) * Math.PI;
			answer = (answer / ppl).toFixed(2)
			setPopText(
				size+"cmのピザを"+ppl+"人でわけると約"+answer+"㎠だロボ！"
			);
		}else{
			roboFlag = 1;
			button.disabled = true;
			const ppl = document.querySelectorAll(".robo-image img");
			for (size = 0; size < ppl.length; size++){
				ppl[size].className = "break";
			}
			setPopText(
				cm.value+"cmのピザを"+ipt.value+"人でわけると"+"約".repeat(72)
			);
			setTimeout(function(){
				PointManager.requestClearFlag(4);
				roboCnt = 0;
				roboFlag = 2;
			}, 5000);
		}
	}

	function setPopText(text){
		popText = text;
		popCnt = 0;
		const pop = document.getElementById("popup");
		pop.opacity = 0;
		pop.innerText = "";
	}

	function setElOpacity(el,add){
		let cur = Number(el.style.opacity);
		if ((cur >= 1 && add > 0) || (cur <= 0 && add < 0)){
			return;
		}
		el.style.opacity = cur + add;
	}

	function update(){
		updatePop();
		updateGauge();
	}

	function updatePop(){
		const pop = document.getElementById("popup");
		if (popText && popCnt < popText.length+200){
			setElOpacity(pop, 0.1);
			if (popCnt < popText.length){
				pop.innerText += popText[popCnt];
			}
			popCnt++;
		}else{
			setElOpacity(pop, -0.1);
		}
	}


	let gCur = 0;
	let gCnt = 0;
	let gTgt = 2;
	const gmax = 10;
	let baseCircle;
	function updateGauge(){
		if (roboFlag == 0){
			if (gCnt < gmax){
				gCnt++;
				drawPizza();
			}else{
				gCnt = gmax;
			}
		};
	}

	function drawCircle(){
		const cvs = document.getElementById("pizzaCanvas");
		baseCircle = document.createElement('canvas');
		baseCircle.width  = cvs.width;
		baseCircle.height = cvs.height;
		const ctr = cvs.width >> 1;
		const ctx = baseCircle.getContext('2d');
		ctx.fillStyle = "brown";
		ctx.beginPath();
		ctx.arc(ctr, ctr, ctr, 0, 2 * Math.PI);
		ctx.lineTo(ctr, ctr);
		ctx.fill();
	}

	function drawPizza(){
		const cvs = document.getElementById("pizzaCanvas");
		const ctx = cvs.getContext('2d');
		ctx.clearRect(0,0,cvs.width,cvs.height);
		ctx.drawImage(baseCircle,0,0,cvs.width,cvs.height);

		const ctr = cvs.width>>1;
		const rad = Math.PI / 180;
		const start = rad * 90;
		ctx.fillStyle = "red";
		ctx.beginPath();
		gCur = (gTgt - gCur) * gCnt / gmax + gCur;
		ctx.arc(ctr, ctr, ctr-2, -start, 360 / gCur * rad - start);
		ctx.lineTo(ctr, ctr);
		ctx.fill();
	}

	function refreshPizza(){
		gCnt = 0;
		gTgt = parseValue(document.getElementById("ipt_num").value) || 1;
	}

	function robotSpeaks(){
		if (roboFlag==0){
			setPopText(roboLine[roboCnt]);
			roboCnt = ++roboCnt % roboLine.length;
		}else if(roboFlag==2){
			if (roboCnt==0){
				setPopText("ボロは壊れてしまいました。");
				roboCnt = 1;
			}else{
				roboCnt = 0;
				setPopText("このような悲しいことを防ぐことがセキュリティです。");
			}
		}
	}
})();
