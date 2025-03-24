(function(){

	//演習中にブラウザの×ボタンやページ移動ボタンを押した際に警告画面を出す
    window.onbeforeunload = function(e) {
  		e.preventDefault();
  		return '';
	};

    const button1 = document.getElementById("swich1");
    const button2 = document.getElementById("swich2");
    const button3 = document.getElementById("swich3");
    const button4 = document.getElementById("swich4");
    const button5 = document.getElementById("swich5");
    const button6 = document.getElementById("swich6");

    window.onload = function(){
    	GameManager.initialize();
    	CANVAS = document.getElementById("screen");
    	GRAPHICS_WIDTH  = this.CANVAS.width;
    	GRAPHICS_HEIGHT = this.CANVAS.height;
    
    	RENDERER = CANVAS.getContext('2d', {
    		antialias: false,
    		alpha: false,
    		depth: false
    	});
    	BGM = document.getElementById("bgm");
    	SE  = document.getElementById("se");
    };
    
    $gameMap = null;
    $gamePlayer = null;
    $gameMapData = [];
    
    class GameManager{
    	static images = ["binSrc", "enmSrc", "mapSrc", "charaSrc"];
    	static jses   = ["Scenes", "Objects", "Input"];
    	static jsons  = ["dataVocab", "dataEnemies"];
    	static maps  = [null, 1, 2];
    	static initialize() {
    		this._currentScene;
    		this._interval;
    		this._loadCnt = 0;
    		this.images.forEach(this.loadImage, this);
    		this.jses.forEach(this.loadJS, this);
    		this.jsons.forEach(this.loadJson, this);
    		this.maps.forEach(this.loadMap, this);
    	}
    
    	static loadImage(name){
    		const img = new Image();
    		img.src = "./img/"+name+".png";
    		img.onload = function (){
    			window["$"+name] = img;
    			this.incrementLoad();
    		}.bind(this);
    	}
    
    	static loadJS(name){
    		const script = document.createElement('script');
    		script.type = 'text/javascript';
    		script.src = "./js/"+name+".js";
    		document.head.append(script);
    		script.onload = function (){
    			this.incrementLoad();
    		}.bind(this);
    	}
    
    	static loadJson(name){
    		const xml = new XMLHttpRequest();
    		xml.onload = function (){
    			window["$"+name] = JSON.parse(xml.responseText);
    			this.incrementLoad();
    		}.bind(this);
    		xml.open("GET", "./js/"+name+".json");
    		xml.send();
    	}
    
    	static loadMap(id){
    		if (id == null){
    			this.incrementLoad();
    			return;
    		}
    		const xml = new XMLHttpRequest();
    		xml.onload = function (){
    			$gameMapData[id] = JSON.parse(xml.responseText);
    			this.incrementLoad();
    		}.bind(this);
    		xml.open("GET", "./js/Map"+("000"+id).slice(-3)+".json");
    		xml.send();
    	}
    
    	static incrementLoad(){
    		this._loadCnt++;
    		const max = this.jses.length + this.images.length + this.jsons.length + this.maps.length;
    		if (this._loadCnt >= max) { this.startGame(); }
    	}
    
    	static firstScene(){
    		return Scene_Title;
    	}
    
    	static startGame(){
    		Input.init();
    		this.createDatabase();
    		this.makeController();
    		this.changeScene(this.firstScene())
    	}
    
    	static createDatabase(){
    		$gameMap = new Game_Map();
    		$gamePlayer = new Game_Player();
    	}
    
    	static update(){
    		this._currentScene && this._currentScene.update();
    		Input.update();
    	}
    
    	static changeScene(scene, arg){
    		this._currentScene && this._currentScene.terminate();
    		this._currentScene = new scene(GameManager);
    		this._interval && clearInterval(this._interval);
    		setTimeout(function(){
    			this._interval = setInterval(this.update.bind(GameManager), 70);
    			this._currentScene.start(arg);
    		}.bind(this), 90);
    	}
    
    	static decimalToHex(n, digit){
    		return ("0000"+(n || 0).toString(16)).slice(-digit);
    	}
    
    	static makePassword(){
    		let str = "";
    		str += this.decimalToHex($gamePlayer.level, 2);
    		str += this.decimalToHex($gamePlayer.hp, 2);
    		str += this.decimalToHex($gamePlayer.x, 2);
    		str += this.decimalToHex($gamePlayer.y, 2);
    		str += this.decimalToHex($gamePlayer.encounterCnt, 1);
    		str += this.decimalToHex($gameMap.mapId, 2);
    		return str;
    	}
    
    	static hexToDecimal(hex){
    		return Number("0x"+hex);
    	}
    
    	static extractPassword(hex){
    		hex = hex.join("");
    		let i = 0;
    		$gamePlayer.level = this.hexToDecimal(hex.slice(i,i+=2));
    		$gamePlayer.hp = this.hexToDecimal(hex.slice(i,i+=2));
    		$gamePlayer.x  = this.hexToDecimal(hex.slice(i,i+=2));
    		$gamePlayer.y  = this.hexToDecimal(hex.slice(i,i+=2));
    		$gamePlayer.encounterCnt = this.hexToDecimal(hex.slice(i,i+=1));
    		$gameMap.setup(this.hexToDecimal(hex.slice(i,i+=2)));
    		if (
    			$gameMap.mapId == 1 &&
    			2 <= $gamePlayer.x && $gamePlayer.x <= 12 &&
    			3 <= $gamePlayer.y && $gamePlayer.y <= 12 &&
    			10 < $gamePlayer.level && 0 < $gamePlayer.hp
    		)
			//FLAG9取得
    		PointManager.requestClearFlag(9);
			button1.disabled = true;
			button2.disabled = true;
			button3.disabled = true;
			button4.disabled = true;
			button5.disabled = true;
			button6.disabled = true;
			//ブラウザの×ボタンやページ移動ボタンを押しても警告画面が出ないようにする
			window.onbeforeunload = null;
    	}
    
    
    static CONTROLLER_TABLE = `
  N      
 W E  BA 
  S      
    `;
    	static makeController(){
    		const controller = document.getElementsByClassName("controller")[0];
    		if (controller){
    			let tr;
    			this.CONTROLLER_TABLE.split("").forEach(function(char){
    				if (char == "\n"){
    					tr = document.createElement('tr');
    					controller.append(tr);
    				}else{
    					const td = document.createElement('td');
    					switch (char){
    						case "N":
    							td.className = "comL comUp";
    							td.innerText = "↑";
    							Input.setButton(td, "up");
    							break;
    						case "W":
    							td.className = "comL comLeft";
    							td.innerText = "←";
    							Input.setButton(td, "left");
    							break;
    						case "E":
    							td.className = "comL comRight";
    							td.innerText = "→";
    							Input.setButton(td, "right");
    							break;
    						case "S":
    							td.className = "comL comDown";
    							td.innerText = "↓";
    							Input.setButton(td, "down");
    							break;
    						case "A":
    							td.className = "comR comA";
    							td.innerText = "A";
    							Input.setButton(td, "ok");
    							break;
    						case "B":
    							td.className = "comR comB";
    							td.innerText = "B";
    							Input.setButton(td, "cancel");
    							break;
    					}
    					tr.append(td);
    				}
    			}, this);
    		}
    	}
    
    };
    
    })();
    