//======================================================
// - InputManager
//======================================================
class InputManager{
	static KEY_LIST = ["ok", "cancel", "down", "left", "right", "up"];
	static init(){
		this.codeLogger = {};
		this.KEY_LIST.forEach(function(code) {
			this.codeLogger[code] = 0;
		}, this);
		window.onkeydown = function(ev){
			const code = this.parseCode(ev.code);
			if (code){
				this.codeLogger[code] = this.codeLogger[code] == 0 ? 1 : 2;
				ev.preventDefault();
				return false;
			}
		}.bind(this);
		window.onkeyup = function(ev){
			const code = this.parseCode(ev.code);
			if (code){
				this.codeLogger[code] = 0;
				ev.preventDefault();
				return false;
			}
		}.bind(this);
	}
	static setButton(tdr, code){
		tdr.onmousedown = tdr.ontouchstart = function(ev){
			this.codeLogger[code] = this.codeLogger[code] == 0 ? 1 : 2;
		}.bind(this);
		tdr.onmouseup = tdr.onmouseleave = tdr.ontouchend = function(ev){
			this.codeLogger[code] = 0;
		}.bind(this);
	}
	static parseCode(code){
		switch (code){
			case "Enter":
			case "Space":
			case "KeyZ":
				return this.KEY_LIST[0];
			case "Backspace":
			case "Escape":
			case "KeyX":
				return this.KEY_LIST[1];
			case "ArrowDown":
			case "Numpad2":
				return this.KEY_LIST[2];
			case "ArrowLeft":
			case "Numpad4":
				return this.KEY_LIST[3];
			case "ArrowRight":
			case "Numpad6":
				return this.KEY_LIST[4];
			case "ArrowUp":
			case "Numpad8":
				return this.KEY_LIST[5];
			default:
				return null;
		}
	}
	static isTriggered(code) {
		if (this.codeLogger[code] == 1){
			this.codeLogger[code] = 2;
			return true;
		}
		return false;
	}
	static isPressed(code) {
		return this.codeLogger[code] >= 1;
	}
	static update(){
	}
}

//======================================================
// - AudioManager
//======================================================
class AudioManager{
	static createStaticAudio(){
		AudioManager.BGMS.concat(AudioManager.SES).map(src => {
			const audio = new Audio(this.formatAudio(src));
			audio.load();
		})
		this._bgm = new Audio();
		this._bgm.loop = true;
		this._bgm.volume = 0.3;
	}
	static formatAudio(src){
		return "./audio/" + src + ".mp3"
	}
	static playBgm(num){
		this._bgm.src = this.formatAudio(AudioManager.BGMS[num]);
		this._bgm.play();
	}
	static stopBgm(){
		this._bgm.pause();
		this._bgm.currentTime = 0;
	}
	static playSe(num){
		const se = new Audio();
		se.loop = false;
		se.volume = 0.3;
		se.src = this.formatAudio(AudioManager.SES[num]);
		se.play();
	}
};
AudioManager.BGMS = ["1071", "1419", "1014"];
AudioManager.SES = ["maodama_sys3", "maodama_sys4", "maodama_sys13"];

//======================================================
// - ScoreManager
//======================================================
class ScoreManager{
	static initVariables(){
		this.rensaCnt = 0;
		this.deleteCnt = 0;
	}
	static addRensa(n){
		this.rensaCnt = Math.min(99999, this.rensaCnt + n);
	}
	static addDeleteLine(n){
		this.deleteCnt = Math.min(99999, this.deleteCnt + n);
	}
	static drawScore(score){
		const cvs = document.createElement('canvas');
		cvs.width = 110;
		cvs.height = 110;
		const ctx = cvs.getContext('2d');
		ctx.font = "30px cursive"; //system-ui
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#00000088";
		let str = String(score);
		let x = cvs.width >> 1;
		let y = cvs.height >> 1;
		ctx.strokeText(str, x, y, cvs.width);
		ctx.fillText(str, x, y, cvs.width);
		return PIXI.Texture.from(cvs);
	}
}

//======================================================
// - GraphicManager
//======================================================
class GraphicManager{
	static generatePixiScreen(){
		this.app = new PIXI.Application({
			width: GraphicManager.width,
			height: GraphicManager.height,
			backgroundColor: 0x000000,
		});
		const ele = document.getElementById('app');
		ele.appendChild(this.app.view);
		this.currentScene = null;
		this.sceneGoto(Scene_Title);
		this.timer = setInterval(this.update.bind(this), 30);
	}
	static sceneGoto(scene){
		if (this.scene && this.scene.terminate){
			this.scene.terminate();
		}
		this.currentScene = scene;
		this.scene = new scene();
	}
	static update(){
		if (
			this.scene && this.scene.update &&
			this.currentScene == this.scene.constructor
		){
			this.scene.update();
		}
		InputManager.update();
	}
	static isEventRunning(){
		if (this.scene && this.scene.isEventRunning){
			return this.scene.isEventRunning();
		}
		return false;
	}
}
GraphicManager.width = 800;
GraphicManager.height = 680;
