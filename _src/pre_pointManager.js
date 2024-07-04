class PointManager{
    static requestClearFlag($stageId){
        const xml = new XMLHttpRequest();
        xml.open("POST", "/2022/_background/clearFlag.php", true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                PointManager.reserveResponse($stageId, this.responseText);
            }
        }
        xml.send(`STAGE=${$stageId}`);
    }
    static reserveResponse($stageId, text){
        if (PointManager.RE_RESPONSE.test(text)){
            const resText = RegExp.$1;
            if (resText == "ALREADY"){
                this.onAlready($stageId);
            }else if (PointManager.RE_DONE_POINT.test(resText)){
                this.onDone(
                    $stageId,
                    Math.floor(RegExp.$1),
                    Math.floor(RegExp.$2),
                    RegExp.$3
                );
            }else{
                this.onError($stageId, text);
            }
        }else{
            this.onError($stageId, text);
        }
    }
    static onAlready($stageId){
        this.getClearEffect().fireAlready($stageId);
        this.requestNewRanking();
    }
    static onDone($stageId, cur, points, name){
        this.getClearEffect().fireDone($stageId, cur, points, name);
        this.requestNewRanking();
    }
    static requestNewRanking(){
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerText = "RankBarGraph.requestNewRanking()";
        const body = parent.document.body;
        body.appendChild(script);
        body.removeChild(script);
    }
    static onError($stageId, text){
        this.getClearEffect().fireError($stageId, text);
    }
    static getClearEffect(){
        if (this._clearEffect == undefined){
            this._clearEffect = new ClearEffect();
        }
        return this._clearEffect;
    }
}
PointManager.RE_RESPONSE = /\!(.+?)\!$/;
PointManager.RE_DONE_POINT = /^DONE:(\d+),(\d+),(.+)$/;


class ClearEffect{
    constructor(){
        this.updateTimer = null;
        this.createDiv();
        this.initVariables();
        this.update();
    }
    initVariables(){
        this.opacity = 0;
        this.mode = null;
        this.effectCnt = -1;
        this.doneObtainPoint = 0;
        this.doneTotalPoint = 0;
    }
    createDiv(){
        this.div = document.createElement('div');
        this.div.id = "ClearEffect";
        this.div.onclick = this.onclick.bind(this);
        const body = parent.document.body;
        body.appendChild(this.div);
    }
    playAudio(id){
        const audio =  document.getElementById(id);
        if (audio) audio.play();
    }
    fireDone($stageId, cur, score, name){
        this.playAudio("audioGet");
        this.start("done");
        this.doneObtainPoint = score;
        this.doneTotalPoint = cur;
        this.div.innerHTML = `
<h2>FLAG${$stageId}={${name}} CLEAR</h2>
<hr>
<p class="calc">${cur - score} + ${this.doneObtainPoint}</p>
`;
    }
    fireAlready($stageId){
        this.playAudio("audioAlready");
        this.start("already");
        this.div.innerHTML = `<h2>FLAG${$stageId} CLEAR</h2><hr>`;
    }
    fireError($stageId, text){
        this.start("error");
        this.div.innerHTML = `
<h2>ERROR</h2>
<hr>
<p>something went wrong of FLAG${$stageId}...</p>
`;
    }
    start(mode){
        this.initVariables();
        this.mode = mode;
        this.effectCnt = 0;
    }
    update(){
        if (this.updateTimer) clearTimeout(this.updateTimer);
        if (this.effectCnt != -1){
            this.effectCnt++;
            if (this.effectCnt > 300){
                this.initVariables();
            }else{
                this.updateBasic();
            }
        }
        this.div.style.opacity = this.opacity / 255;
        this.div.style.display = this.opacity == 0 ? "none" : "inherit";
        this.updateTimer = setTimeout(this.update.bind(this), 40);
    }
    updateBasic(){
        if (this.effectCnt < this.fadeoutCnt){
            this.opacity = Math.min(this.opacity + 12, 255);
            if (this.mode == "done") this.updateDone();
        }else{
            this.opacity = Math.max(this.opacity - 12, 0);
        }
    }
    updateDone(){
        if (this.effectCnt < 40 || this.doneObtainPoint == 0) return;
        const pFormula = this.div.querySelector('p.calc');
        if (pFormula){
            this.doneObtainPoint = Math.max(this.doneObtainPoint - 10, 0);
            pFormula.innerText = `${this.doneTotalPoint - this.doneObtainPoint
            } + ${this.doneObtainPoint}`;
            if (this.doneObtainPoint == 0){
                this.effectCnt = this.fadeoutCnt - 30;
            }else{
                this.effectCnt--;
            }
        }
    }
    get fadeoutCnt(){ return 180; }
    onclick(ev){
        if (
            this.mode != null && this.mode != "done" &&
            this.effectCnt < this.fadeoutCnt
        ){
            this.effectCnt = this.fadeoutCnt;
            ev.preventDefault();
            return true;
        }
        return false;
    }
}
