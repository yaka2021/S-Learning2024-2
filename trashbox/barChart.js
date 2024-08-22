(function(){
const __onload = window.onload;
window.onload = function(){
    if (__onload) __onload.call(this);
    const barCvs = document.getElementById('barCvs');
    if (barCvs){
        RankBarGraph.child = new RankBarGraph(barCvs);
		RankBarGraph.requestNewRanking();
        update();
    }
	const reload = document.getElementById("reload")
	if (reload){
		reload.onclick = onReload.bind(this, reload);
	}
}

let timer = null;
function onReload(el){
	if (!timer){
		el.style.animation = "reloading 1.5s ease-out";
		timer = setTimeout(function(){
			el.style.animation = "unset";
			clearTimeout(timer);
			timer = null;
		}, 1300);
		RankBarGraph.requestNewRanking();
	}
	return true;
}

function update(timer){
    if (RankBarGraph.child) RankBarGraph.child.update();
    if (timer) clearTimeout(timer);
    timer = setTimeout(update.bind(this, timer), 20);
}
})();


class RankBarGraph{
	static child;
	static ranking;
	static requestNewRanking(){
        const xml = new XMLHttpRequest();
        xml.open("POST", "./_background/updateRanking.php", true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
				const json = JSON.parse(this.responseText.replace(/^.*?<BR>/, ""));
				if (typeof json == 'object'){
					RankBarGraph.ranking = json;
					if (RankBarGraph.child){
						RankBarGraph.child.reset();
					}
				}else{
					console.log(json);
				}
            }
        }
        xml.send();
	}
	constructor(cvs){
		this._cvs = cvs;
		this.width  = cvs.width;
		this.height = cvs.height;
		this.innerPadX = 50;
		this.innerTopY = 10;
		this.innerBottomY = 70;
		this.innerWidth  = this.width - this.innerPadX * 2;
		this.innerHeight = this.height - this.innerTopY - this.innerBottomY;
		this._ctx = cvs.getContext('2d');
		this._ctx.textAlign = 'center';
		this._ctx.lineWidth = 2;
		this.inStartRange = false;
		this.update();
	}
	reset(){
		this.cnt = 0;
		this._rankBars = RankBarGraph.ranking.map(function(info, i){
			return new RankBar(i, info, 40);
		});
		this.refresh();
	}
	refresh(){
		this._ctx.clearRect(0, 0, this.width, this.height);
		const maxValue = Math.max(...this._rankBars.map(function(bar){
			return bar._score;
		}));
		let y = this.innerHeight + this.innerTopY;
		let textY = this.innerHeight / 2 + this.innerTopY
		const barColor = "#12860e";
		this._ctx.fillStyle = barColor;
		this._ctx.fillRect(0, y, this.width, 1);

		let spaceWid = 14;
		let x = this.innerPadX + spaceWid / 2;
		let barWidth = this.innerWidth / Math.max(
			this._rankBars.length, 1
		) - spaceWid;
		const rate = Math.sin(Math.PI * this.cnt / this.maxCnt() / 2);
		this._rankBars.forEach(function(bar, i){
			const height = this.innerHeight * bar._score / maxValue * rate;
			this._ctx.fillStyle = bar._color;
			this._ctx.fillRect(x, y - height, barWidth, height);
			this._ctx.font = '24px sans';
			this._ctx.fillStyle = "white";
			this._ctx.strokeStyle = "#0cee04";
			this.drawText(bar.getName(), x, textY - 16, barWidth);
			this._ctx.font = '20px sans';
			this.drawText(Math.floor(bar._score * rate) + "pts", x, textY + 16, barWidth);
			this._ctx.fillStyle = 'white';
			this._ctx.strokeStyle = barColor;
			this.drawText(bar._rank + "位", x, y + 28, barWidth);
			x += barWidth + spaceWid;
		}, this);
	}
	drawText(text, x, y, width){
		x += width >> 1;
		this._ctx.strokeText(text, x, y, width);
		this._ctx.fillText(text, x, y, width);
	}
	maxCnt(){
		return 60;
	}
	update(){
		if (!RankBarGraph.ranking) return;
		if (
			this.inStartRange ||
			this._cvs.getBoundingClientRect().top <= window.innerHeight
		) {
			this.inStartRange = true;
			if (this.cnt <= this.maxCnt()){
				this.refresh();
				this.cnt++;
			}
		}
	}
}

class RankBar{
	constructor(i, info){
		this._userId = info['ID'];
		this._score = info['SCORES'];
		this._rank = info["RANKS"];
		this._name = unescapeHTML(info["NAME"]);
		this.isPlayer = this._userId == $player_id;
		this._color = this.isPlayer ? "#0cee04" : "#12860e";
		//RankBar.borderColor[i % RankBar.borderColor.length];
	}
	getName(){ return this._name; }
}
RankBar.borderColor = [
	"red", "blue", "gold", "green", "purple"
];

function unescapeHTML(escapedHtml) {
	const doc = new DOMParser().parseFromString(escapedHtml, 'text/html');
	return doc.documentElement.textContent;
}
